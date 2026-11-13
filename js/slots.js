(function () {
  const Logic = globalThis.ForgeLogic;
  if (!Logic) {
    throw new Error("ForgeLogic nao carregou antes de slots.js");
  }

  globalThis.WEEKDAY_LABELS = Logic.WEEKDAY_LABELS;
  globalThis.datePart = Logic.datePart;
  globalThis.formatDateTime = Logic.formatDateTime;
  globalThis.toLocalIso = Logic.toLocalIso;
  globalThis.addMinutesToIso = Logic.addMinutesToIso;

  async function getAvailableSlots({ userId, serviceId, dateStr, excludeAppointmentId }) {
    const service = await dbGetService(serviceId);
    if (!service || service.userId !== userId) return [];

    const weekday = Logic.weekdayFromDateStr(dateStr);
    const windows = (await dbListAvailability(userId)).filter((a) => a.weekday === weekday);
    if (!windows.length) return [];

    const appointments = await dbListAppointmentsForDay(userId, dateStr);
    return Logic.buildAvailableSlots({
      dateStr,
      durationMinutes: service.durationMinutes,
      windows,
      appointments,
      excludeAppointmentId
    });
  }

  globalThis.getAvailableSlots = getAvailableSlots;
})();