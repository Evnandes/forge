let app = null;
let auth = null;
let db = null;

function getFirebase() {
  if (!window.forgeConfigOk || !window.forgeConfigOk()) {
    throw new Error("Configure o Firebase em js/config.js.");
  }
  if (!app) {
    app = firebase.initializeApp(window.FORGE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
  }
  return { auth, db };
}

function mapService(id, data) {
  return ForgeLogic.mapService(id, data);
}

function mapAvailability(id, data) {
  return ForgeLogic.mapAvailability(id, data);
}

function mapAppointment(id, data) {
  return ForgeLogic.mapAppointment(id, data);
}

function waitForAuth() {
  const { auth } = getFirebase();
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    });
  });
}

async function dbGetSessionUser() {
  const { auth, db } = getFirebase();
  const user = auth.currentUser || (await waitForAuth());
  if (!user) return null;
  const snap = await db.collection("profiles").doc(user.uid).get();
  const profileName = snap.exists ? snap.data().name : null;
  return {
    id: user.uid,
    name: profileName || user.displayName || "Usuário",
    email: user.email || ""
  };
}

async function ensureProfile(user) {
  const { db } = getFirebase();
  const ref = db.collection("profiles").doc(user.uid);
  const name = ForgeLogic.sanitizePlainText(
    user.displayName || (user.email ? user.email.split("@")[0] : "Usuário"),
    80
  );
  const snap = await ref.get();
  const payload = {
    name,
    createdAt: snap.exists && snap.data().createdAt
      ? snap.data().createdAt
      : firebase.firestore.FieldValue.serverTimestamp()
  };
  await ref.set(payload);
  return { id: user.uid, name, email: user.email || "" };
}

async function dbSignInWithGoogle() {
  const { auth } = getFirebase();
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = await auth.signInWithPopup(provider);
  return ensureProfile(result.user);
}

async function dbClearSession() {
  const { auth } = getFirebase();
  await auth.signOut();
}

async function dbListServices(userId) {
  const { db } = getFirebase();
  const snap = await db.collection("services").where("userId", "==", userId).get();
  return snap.docs
    .map((d) => mapService(d.id, d.data()))
    .filter((s) => !s.deleted)
    .sort((a, b) => a.name.localeCompare(b.name));
}

async function dbCreateService({ userId, name, durationMinutes, price }) {
  const { db } = getFirebase();
  const parsed = ForgeLogic.validateServiceInput({ name, durationMinutes, price });
  if (!parsed.ok) throw new Error(parsed.errors[0]);
  const payload = {
    userId,
    name: parsed.value.name,
    durationMinutes: parsed.value.durationMinutes,
    price:
      parsed.value.price === "" || parsed.value.price === null || parsed.value.price === undefined
        ? null
        : Number(parsed.value.price),
    deleted: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection("services").add(payload);
  return mapService(ref.id, payload);
}

async function dbUpdateService(serviceId, fields) {
  const { db } = getFirebase();
  const parsed = ForgeLogic.validateServiceInput({
    name: fields.name,
    durationMinutes: fields.durationMinutes,
    price: fields.price
  });
  if (!parsed.ok) throw new Error(parsed.errors[0]);
  const payload = {
    name: parsed.value.name,
    durationMinutes: parsed.value.durationMinutes,
    price:
      parsed.value.price === "" || parsed.value.price === null || parsed.value.price === undefined
        ? null
        : Number(parsed.value.price)
  };
  await db.collection("services").doc(serviceId).update(payload);
  const snap = await db.collection("services").doc(serviceId).get();
  return mapService(snap.id, snap.data());
}

async function dbDeleteService(serviceId) {
  const { db } = getFirebase();
  await db.collection("services").doc(serviceId).update({ deleted: true });
}

async function dbListAvailability(userId) {
  const { db } = getFirebase();
  const snap = await db.collection("availability").where("userId", "==", userId).get();
  return snap.docs.map((d) => mapAvailability(d.id, d.data()));
}

async function dbAddAvailability({ userId, weekday, start, end }) {
  const parsed = ForgeLogic.validateAvailabilityInput({ weekday, start, end });
  if (!parsed.ok) throw new Error(parsed.errors[0]);
  const { db } = getFirebase();
  const payload = {
    userId,
    weekday: parsed.value.weekday,
    start: parsed.value.start,
    end: parsed.value.end
  };
  const ref = await db.collection("availability").add(payload);
  return mapAvailability(ref.id, payload);
}

async function dbRemoveAvailability(id) {
  const { db } = getFirebase();
  await db.collection("availability").doc(id).delete();
}

async function dbListBusyForDay(userId, dateStr) {
  const { db } = getFirebase();
  const ref = db.collection("dayBusy").doc(ForgeLogic.dayBusyId(userId, dateStr));
  const snap = await ref.get();
  if (!snap.exists) return [];
  return ForgeLogic.intervalsToAppointments(snap.data().intervals || []);
}

async function dbListAppointments(userId) {
  const { db } = getFirebase();
  const snap = await db.collection("appointments").where("userId", "==", userId).get();
  return snap.docs
    .map((d) => mapAppointment(d.id, d.data()))
    .filter((a) => a.status === "agendado")
    .sort((a, b) => String(a.start).localeCompare(String(b.start)));
}

async function dbGetAppointment(id) {
  const { db } = getFirebase();
  const snap = await db.collection("appointments").doc(id).get();
  if (!snap.exists) return null;
  return mapAppointment(snap.id, snap.data());
}

async function dbCreateAppointment({ userId, serviceId, clientName, startIso, endIso }) {
  const { db } = getFirebase();
  const service = await dbGetService(serviceId);
  if (!service || service.userId !== userId || service.deleted) {
    throw new Error("Serviço inválido para este profissional.");
  }
  const dateStr = ForgeLogic.datePart(startIso);
  const safeName = ForgeLogic.sanitizePlainText(clientName, 80);
  if (!safeName || safeName.length < 2) throw new Error("Informe um nome válido.");

  const dayId = ForgeLogic.dayBusyId(userId, dateStr);
  const dayRef = db.collection("dayBusy").doc(dayId);
  const appointmentRef = db.collection("appointments").doc();

  await db.runTransaction(async (tx) => {
    const daySnap = await tx.get(dayRef);
    const intervals = daySnap.exists ? [...(daySnap.data().intervals || [])] : [];
    const active = ForgeLogic.intervalsToAppointments(intervals);
    if (ForgeLogic.hasTimeConflict(startIso, endIso, active)) {
      throw new Error("Horário indisponível.");
    }
    intervals.push({
      start: startIso,
      end: endIso,
      appointmentId: appointmentRef.id,
      status: "agendado"
    });
    tx.set(dayRef, { userId, date: dateStr, intervals }, { merge: true });
    tx.set(appointmentRef, {
      userId,
      serviceId,
      clientName: safeName,
      start: startIso,
      end: endIso,
      date: dateStr,
      status: "agendado",
      dayBusyId: dayId,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  });

  return mapAppointment(appointmentRef.id, {
    userId,
    serviceId,
    clientName: safeName,
    start: startIso,
    end: endIso,
    status: "agendado"
  });
}

async function dbCancelAppointment(id) {
  const { db } = getFirebase();
  const current = await dbGetAppointment(id);
  if (!current) throw new Error("Agendamento não encontrado.");
  const dateStr = ForgeLogic.datePart(current.start);
  const dayId = ForgeLogic.dayBusyId(current.userId, dateStr);
  const dayRef = db.collection("dayBusy").doc(dayId);
  const appointmentRef = db.collection("appointments").doc(id);

  await db.runTransaction(async (tx) => {
    const daySnap = await tx.get(dayRef);
    const intervals = daySnap.exists ? [...(daySnap.data().intervals || [])] : [];
    const next = intervals.map((item) => {
      if (item.appointmentId === id) {
        return { ...item, status: "cancelado" };
      }
      return item;
    });
    tx.set(dayRef, { userId: current.userId, date: dateStr, intervals: next }, { merge: true });
    tx.update(appointmentRef, { status: "cancelado" });
  });

  return dbGetAppointment(id);
}

async function dbRescheduleAppointment(id, startIso, endIso) {
  const { db } = getFirebase();
  const current = await dbGetAppointment(id);
  if (!current) throw new Error("Agendamento não encontrado.");

  const oldDate = ForgeLogic.datePart(current.start);
  const newDate = ForgeLogic.datePart(startIso);
  const oldDayRef = db.collection("dayBusy").doc(ForgeLogic.dayBusyId(current.userId, oldDate));
  const newDayRef = db.collection("dayBusy").doc(ForgeLogic.dayBusyId(current.userId, newDate));
  const appointmentRef = db.collection("appointments").doc(id);

  await db.runTransaction(async (tx) => {
    const oldSnap = await tx.get(oldDayRef);
    const newSnap = oldDate === newDate ? oldSnap : await tx.get(newDayRef);
    const oldIntervals = oldSnap.exists ? [...(oldSnap.data().intervals || [])] : [];
    const newIntervalsBase =
      oldDate === newDate
        ? oldIntervals
        : newSnap.exists
          ? [...(newSnap.data().intervals || [])]
          : [];

    const withoutCurrent = newIntervalsBase.filter((item) => item.appointmentId !== id);
    const active = ForgeLogic.intervalsToAppointments(withoutCurrent);
    if (ForgeLogic.hasTimeConflict(startIso, endIso, active, id)) {
      throw new Error("Horário indisponível.");
    }

    if (oldDate === newDate) {
      const next = oldIntervals.map((item) => {
        if (item.appointmentId === id) {
          return { start: startIso, end: endIso, appointmentId: id, status: "agendado" };
        }
        return item;
      });
      tx.set(
        oldDayRef,
        { userId: current.userId, date: oldDate, intervals: next },
        { merge: true }
      );
    } else {
      const oldNext = oldIntervals.map((item) => {
        if (item.appointmentId === id) {
          return { ...item, status: "cancelado" };
        }
        return item;
      });
      withoutCurrent.push({
        start: startIso,
        end: endIso,
        appointmentId: id,
        status: "agendado"
      });
      tx.set(
        oldDayRef,
        { userId: current.userId, date: oldDate, intervals: oldNext },
        { merge: true }
      );
      tx.set(
        newDayRef,
        { userId: current.userId, date: newDate, intervals: withoutCurrent },
        { merge: true }
      );
    }

    tx.update(appointmentRef, {
      start: startIso,
      end: endIso,
      date: newDate,
      status: "agendado",
      dayBusyId: ForgeLogic.dayBusyId(current.userId, newDate)
    });
  });

  return dbGetAppointment(id);
}

async function dbGetService(serviceId) {
  const { db } = getFirebase();
  const snap = await db.collection("services").doc(serviceId).get();
  if (!snap.exists) return null;
  return mapService(snap.id, snap.data());
}

async function dbListProfessionals() {
  const { db } = getFirebase();
  const snap = await db.collection("profiles").orderBy("name").get();
  return snap.docs.map((d) => {
    const data = d.data();
    return { id: d.id, name: data.name || "Profissional" };
  });
}

async function dbListAppointmentsForDay(userId, dateStr) {
  return dbListBusyForDay(userId, dateStr);
}

async function dbSyncDayBusyFromAppointments(userId) {
  const { db } = getFirebase();
  const snap = await db.collection("appointments").where("userId", "==", userId).get();
  const byDate = {};
  snap.docs.forEach((doc) => {
    const data = doc.data();
    const dateStr = ForgeLogic.datePart(data.start);
    if (!byDate[dateStr]) byDate[dateStr] = [];
    byDate[dateStr].push({
      start: data.start,
      end: data.end,
      appointmentId: doc.id,
      status: data.status || "agendado"
    });
  });
  const writes = Object.keys(byDate).map((dateStr) =>
    db.collection("dayBusy").doc(ForgeLogic.dayBusyId(userId, dateStr)).set(
      { userId, date: dateStr, intervals: byDate[dateStr] },
      { merge: true }
    )
  );
  await Promise.all(writes);
}