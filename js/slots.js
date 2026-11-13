const {
  WEEKDAY_LABELS,
  timeToMinutes,
  minutesToTime,
  datePart,
  toLocalIso,
  addMinutesToIso,
  formatDateTime,
  buildAvailableSlots
} = globalThis.ForgeLogic;

async function getAvailableSlots({ userId, serviceId, dateStr, excludeAppointmentId }) {
  const service = await dbGetService(serviceId);
  if (!service || service.userId !== userId) return [];

  const day = new Date(`${dateStr}T12:00:00`);
  const weekday = day.getDay();
  const windows = (await dbListAvailability(userId)).filter((a) => a.weekday === weekday);
  if (!windows.length) return [];

  let appointments = await dbListAppointmentsForDay(userId, dateStr);
  return buildAvailableSlots({
    dateStr,
    durationMinutes: service.durationMinutes,
    windows,
    appointments,
    excludeAppointmentId
  });
}