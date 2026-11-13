import { describe, expect, it } from "vitest";
import "../js/logic.js";

const {
  timeToMinutes,
  minutesToTime,
  datePart,
  toLocalIso,
  addMinutesToIso,
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
} = globalThis.ForgeLogic;

describe("tempo e data", () => {
  it("converte hora para minutos e volta", () => {
    expect(timeToMinutes("09:30")).toBe(570);
    expect(minutesToTime(570)).toBe("09:30");
  });

  it("extrai data e monta iso local", () => {
    expect(datePart("2026-11-13T17:30:00")).toBe("2026-11-13");
    expect(toLocalIso("2026-11-13", "17:30")).toBe("2026-11-13T17:30:00");
  });

  it("soma minutos no iso", () => {
    expect(addMinutesToIso("2026-11-13T17:30:00", 30)).toBe("2026-11-13T18:00:00");
  });

  it("descobrir weekday com meio-dia local", () => {
    expect(weekdayFromDateStr("2026-11-13")).toBe(5);
  });
});

describe("disponibilidade", () => {
  it("valida janela de horario", () => {
    expect(isValidAvailabilityWindow("09:00", "18:00")).toBe(true);
    expect(isValidAvailabilityWindow("18:00", "09:00")).toBe(false);
  });
});

describe("conflito de agenda", () => {
  const existing = [
    { id: "a1", start: "2026-11-13T17:30:00", end: "2026-11-13T18:00:00", status: "agendado" }
  ];

  it("detecta sobreposicao", () => {
    expect(hasTimeConflict("2026-11-13T17:45:00", "2026-11-13T18:15:00", existing)).toBe(true);
  });

  it("permite horario livre", () => {
    expect(hasTimeConflict("2026-11-13T18:00:00", "2026-11-13T18:30:00", existing)).toBe(false);
  });

  it("ignora id excluido na remarcacao", () => {
    expect(hasTimeConflict("2026-11-13T17:30:00", "2026-11-13T18:00:00", existing, "a1")).toBe(false);
  });
});

describe("slots disponiveis", () => {
  it("gera slots e remove ocupados", () => {
    const free = buildAvailableSlots({
      dateStr: "2026-11-13",
      durationMinutes: 30,
      windows: [{ start: "09:00", end: "11:00" }],
      appointments: []
    });
    expect(free.map((s) => s.label)).toEqual(["09:00", "09:30", "10:00", "10:30"]);

    const busy = buildAvailableSlots({
      dateStr: "2026-11-13",
      durationMinutes: 30,
      windows: [{ start: "09:00", end: "11:00" }],
      appointments: [
        { id: "1", start: "2026-11-13T09:30:00", end: "2026-11-13T10:00:00", status: "agendado" }
      ]
    });
    expect(busy.map((s) => s.label)).toEqual(["09:00", "10:00", "10:30"]);
  });
});

describe("seguranca de texto e dayBusy", () => {
  it("remove html de nomes", () => {
    expect(sanitizePlainText('<script>alert(1)</script>Ana', 80)).toBe("alert(1)Ana");
  });

  it("monta id do dia e intervalos sem PII", () => {
    expect(dayBusyId("u1", "2026-11-13")).toBe("u1_2026-11-13");
    const mapped = intervalsToAppointments([
      { start: "a", end: "b", appointmentId: "1", status: "agendado" },
      { start: "c", end: "d", appointmentId: "2", status: "cancelado" }
    ]);
    expect(mapped).toHaveLength(1);
    expect(mapped[0].id).toBe("1");
  });
});

describe("validacoes de formulario", () => {
  it("valida servico disponibilidade e booking", () => {
    expect(validateServiceInput({ name: "Corte", durationMinutes: 30, price: 50 }).ok).toBe(true);
    expect(validateAvailabilityInput({ weekday: 1, start: "09:00", end: "18:00" }).ok).toBe(true);
    expect(
      validateBookingInput({
        userId: "u1",
        serviceId: "s1",
        dateStr: "2099-01-01",
        slot: "x|y",
        clientName: "Ana"
      }).ok
    ).toBe(true);
    expect(validateRescheduleInput({ slot: "" }).ok).toBe(false);
  });
});

describe("permissoes e config", () => {
  it("dono gerencia e cliente agenda", () => {
    expect(canManageAgenda("u1", "u1")).toBe(true);
    expect(canManageAgenda("u1", "u2")).toBe(false);
    expect(clientCanCreateAppointment()).toBe(true);
  });

  it("config firebase completa", () => {
    expect(
      forgeConfigIsComplete({
        apiKey: "AIza",
        authDomain: "x.firebaseapp.com",
        projectId: "forge-agenda-evn",
        appId: "1:123:web:abc"
      })
    ).toBe(true);
  });
});

describe("mapeamento", () => {
  it("mapeia entidades", () => {
    expect(mapService("s1", { userId: "u1", name: "A", durationMinutes: 30, price: null, deleted: false }).id).toBe("s1");
    expect(mapAvailability("a1", { userId: "u1", weekday: 2, start: "09:00", end: "10:00" }).weekday).toBe(2);
    expect(mapAppointment("p1", { userId: "u1", serviceId: "s1", clientName: "Ana", start: "a", end: "b", status: "agendado" }).clientName).toBe("Ana");
    expect(activeServices([{ id: "1", deleted: false }, { id: "2", deleted: true }])).toHaveLength(1);
    expect(appointmentsFromDate([{ start: "2026-11-12T10:00:00" }, { start: "2026-11-13T10:00:00" }], "2026-11-13")).toHaveLength(1);
  });
});