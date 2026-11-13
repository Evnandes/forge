let app = null;
let auth = null;
let db = null;

function getFirebase() {
  if (!window.forgeConfigOk || !window.forgeConfigOk()) {
    throw new Error("Configure o Firebase em js/config.js (cole a config do console).");
  }
  if (!app) {
    app = firebase.initializeApp(window.FORGE_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
  }
  return { auth, db };
}

function mapService(id, data) {
  return globalThis.ForgeLogic.mapService(id, data);
}

function mapAvailability(id, data) {
  return globalThis.ForgeLogic.mapAvailability(id, data);
}

function mapAppointment(id, data) {
  return globalThis.ForgeLogic.mapAppointment(id, data);
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
  if (snap.exists) {
    const data = snap.data();
    return { id: user.uid, name: data.name || user.displayName || "Usuário", email: data.email || user.email || "" };
  }
  return {
    id: user.uid,
    name: user.displayName || "Usuário",
    email: user.email || ""
  };
}

async function ensureProfile(user) {
  const { db } = getFirebase();
  const ref = db.collection("profiles").doc(user.uid);
  const snap = await ref.get();
  const payload = {
    name: user.displayName || (user.email ? user.email.split("@")[0] : "Usuário"),
    email: user.email || ""
  };
  if (!snap.exists) {
    await ref.set({ ...payload, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  } else {
    await ref.set(payload, { merge: true });
  }
  return { id: user.uid, name: payload.name, email: payload.email };
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
  const payload = {
    userId,
    name: name.trim(),
    durationMinutes: Number(durationMinutes),
    price: price === "" || price === null || price === undefined ? null : Number(price),
    deleted: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection("services").add(payload);
  return mapService(ref.id, payload);
}

async function dbUpdateService(serviceId, fields) {
  const { db } = getFirebase();
  const payload = {};
  if (fields.name !== undefined) payload.name = fields.name.trim();
  if (fields.durationMinutes !== undefined) payload.durationMinutes = Number(fields.durationMinutes);
  if (fields.price !== undefined) {
    payload.price = fields.price === "" || fields.price === null ? null : Number(fields.price);
  }
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
  if (!globalThis.ForgeLogic.isValidAvailabilityWindow(start, end)) throw new Error("Horário inicial deve ser antes do final.");
  const { db } = getFirebase();
  const payload = {
    userId,
    weekday: Number(weekday),
    start,
    end
  };
  const ref = await db.collection("availability").add(payload);
  return mapAvailability(ref.id, payload);
}

async function dbRemoveAvailability(id) {
  const { db } = getFirebase();
  await db.collection("availability").doc(id).delete();
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
  const existing = await dbListAppointmentsForDay(userId, String(startIso).slice(0, 10));
  if (globalThis.ForgeLogic.hasTimeConflict(startIso, endIso, existing)) throw new Error("Horário indisponível.");
  const payload = {
    userId,
    serviceId,
    clientName: clientName.trim(),
    start: startIso,
    end: endIso,
    status: "agendado",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  const ref = await db.collection("appointments").add(payload);
  return mapAppointment(ref.id, payload);
}

async function dbCancelAppointment(id) {
  const { db } = getFirebase();
  await db.collection("appointments").doc(id).update({ status: "cancelado" });
  return dbGetAppointment(id);
}

async function dbRescheduleAppointment(id, startIso, endIso) {
  const { db } = getFirebase();
  const current = await dbGetAppointment(id);
  if (!current) throw new Error("Agendamento não encontrado.");
  const existing = await dbListAppointmentsForDay(current.userId, String(startIso).slice(0, 10));
  if (globalThis.ForgeLogic.hasTimeConflict(startIso, endIso, existing, id)) {
    throw new Error("Horário indisponível.");
  }
  await db.collection("appointments").doc(id).update({
    start: startIso,
    end: endIso,
    status: "agendado"
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
    return { id: d.id, name: data.name || "Profissional", email: data.email || "" };
  });
}

async function dbListAppointmentsForDay(userId, dateStr) {
  const dayStart = `${dateStr}T00:00:00`;
  const dayEnd = `${dateStr}T23:59:59`;
  const all = await dbListAppointments(userId);
  return all.filter((a) => a.start >= dayStart && a.start <= dayEnd);
}