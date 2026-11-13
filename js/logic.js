const WEEKDAY_LABELS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado"
];

function timeToMinutes(hhmm) {
  const [h, m] = String(hhmm).split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(total) {
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

function datePart(iso) {
  return String(iso).slice(0, 10);
}

function toLocalIso(dateStr, hhmm) {
  return `${dateStr}T${hhmm}:00`;
}

function addMinutesToIso(startIso, minutes) {
  const date = new Date(startIso);
  date.setMinutes(date.getMinutes() + Number(minutes));
  const y = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const s = String(date.getSeconds()).padStart(2, "0");
  return `${y}-${mo}-${d}T${h}:${mi}:${s}`;
}

function formatDateTime(iso) {
  const date = new Date(iso);
  return date.toLocaleString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function weekdayFromDateStr(dateStr) {
  return new Date(`${dateStr}T12:00:00`).getDay();
}

function isValidAvailabilityWindow(start, end) {
  return Boolean(start) && Boolean(end) && start < end;
}

function hasTimeConflict(startIso, endIso, appointments, excludeId) {
  return (appointments || []).some((a) => {
    if (excludeId && a.id === excludeId) return false;
    if (a.status && a.status !== "agendado") return false;
    return a.start < endIso && startIso < a.end;
  });
}

function buildAvailableSlots({
  dateStr,
  durationMinutes,
  windows,
  appointments,
  excludeAppointmentId
}) {
  const duration = Number(durationMinutes);
  if (!dateStr || !duration || duration <= 0) return [];
  if (!windows || !windows.length) return [];

  const slots = [];
  for (const window of windows) {
    let cursor = timeToMinutes(window.start);
    const end = timeToMinutes(window.end);
    while (cursor + duration <= end) {
      const startHm = minutesToTime(cursor);
      const startIso = toLocalIso(dateStr, startHm);
      const endIso = addMinutesToIso(startIso, duration);
      if (!hasTimeConflict(startIso, endIso, appointments, excludeAppointmentId)) {
        slots.push({ startIso, endIso, label: startHm });
      }
      cursor += duration;
    }
  }
  return slots;
}

function mapService(id, data) {
  return {
    id,
    userId: data.userId,
    name: data.name,
    durationMinutes: data.durationMinutes,
    price: data.price === undefined || data.price === null ? null : Number(data.price),
    deleted: !!data.deleted
  };
}

function mapAvailability(id, data) {
  return {
    id,
    userId: data.userId,
    weekday: Number(data.weekday),
    start: data.start,
    end: data.end
  };
}

function mapAppointment(id, data) {
  return {
    id,
    userId: data.userId,
    serviceId: data.serviceId,
    clientName: data.clientName,
    start: data.start,
    end: data.end,
    status: data.status
  };
}

function activeServices(services) {
  return (services || []).filter((s) => !s.deleted);
}

function appointmentsFromDate(appointments, fromDateStr) {
  return (appointments || []).filter((a) => datePart(a.start) >= fromDateStr);
}

function forgeConfigIsComplete(config) {
  if (!config) return false;
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  return required.every((key) => {
    const value = config[key];
    return value && !String(value).includes("COLE_AQUI");
  });
}

function canManageAgenda(authUid, resourceUserId) {
  return Boolean(authUid) && authUid === resourceUserId;
}

function clientCanCreateAppointment() {
  return true;
}

function sanitizePlainText(value, maxLength) {
  const limit = maxLength || 80;
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/[<>&"'`]/g, "")
    .trim()
    .slice(0, limit);
}

function dayBusyId(userId, dateStr) {
  return `${userId}_${dateStr}`;
}

function intervalsToAppointments(intervals) {
  return (intervals || [])
    .filter((i) => i && i.status === "agendado")
    .map((i, index) => ({
      id: i.appointmentId || `interval-${index}`,
      start: i.start,
      end: i.end,
      status: i.status
    }));
}

function validateServiceInput({ name, durationMinutes, price }) {
  const errors = [];
  const cleanName = sanitizePlainText(name, 80);
  const duration = Number(durationMinutes);
  if (!cleanName || cleanName.length < 2) errors.push("Informe o nome do serviço.");
  if (!Number.isFinite(duration) || duration < 5) errors.push("Duração mínima é 5 minutos.");
  if (duration % 5 !== 0) errors.push("Duração deve ser múltiplo de 5 minutos.");
  if (price !== "" && price !== null && price !== undefined) {
    const n = Number(price);
    if (!Number.isFinite(n) || n < 0) errors.push("Preço deve ser zero ou maior.");
  }
  return { ok: errors.length === 0, errors, value: { name: cleanName, durationMinutes: duration, price } };
}

function validateAvailabilityInput({ weekday, start, end }) {
  const errors = [];
  const day = Number(weekday);
  if (!Number.isInteger(day) || day < 0 || day > 6) errors.push("Escolha um dia da semana válido.");
  if (!start || !end) errors.push("Informe horário de início e fim.");
  if (start && end && !isValidAvailabilityWindow(start, end)) {
    errors.push("Horário inicial deve ser antes do final.");
  }
  return { ok: errors.length === 0, errors, value: { weekday: day, start, end } };
}

function validateBookingInput({ userId, serviceId, dateStr, slot, clientName }) {
  const errors = [];
  const name = sanitizePlainText(clientName, 80);
  if (!userId) errors.push("Selecione o profissional.");
  if (!serviceId) errors.push("Selecione o serviço.");
  if (!dateStr) errors.push("Selecione a data.");
  if (!slot) errors.push("Selecione um horário disponível.");
  if (!name || name.length < 2) errors.push("Informe o seu nome (mínimo 2 caracteres).");
  if (dateStr) {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const todayStr = `${y}-${m}-${d}`;
    if (dateStr < todayStr) errors.push("Não é possível agendar em data passada.");
  }
  return {
    ok: errors.length === 0,
    errors,
    value: { userId, serviceId, dateStr, slot, clientName: name }
  };
}

function validateRescheduleInput({ slot }) {
  const errors = [];
  if (!slot) errors.push("Escolha um horário livre para remarcar.");
  return { ok: errors.length === 0, errors, value: { slot } };
}

const api = {
  WEEKDAY_LABELS,
  timeToMinutes,
  minutesToTime,
  datePart,
  toLocalIso,
  addMinutesToIso,
  formatDateTime,
  weekdayFromDateStr,
  isValidAvailabilityWindow,
  hasTimeConflict,
  buildAvailableSlots,
  mapService,
  mapAvailability,
  mapAppointment,
  activeServices,
  appointmentsFromDate,
  forgeConfigIsComplete,
  canManageAgenda,
  clientCanCreateAppointment,
  sanitizePlainText,
  dayBusyId,
  intervalsToAppointments,
  validateServiceInput,
  validateAvailabilityInput,
  validateBookingInput,
  validateRescheduleInput
};

if (typeof globalThis !== "undefined") {
  globalThis.ForgeLogic = api;
}