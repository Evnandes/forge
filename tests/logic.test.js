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
    expect(isValidAvailabilityWindow("09:00", "09:00")).toBe(false);
  });
});

describe("conflito de agenda", () => {
  const existing = [
    {
      id: "a1",
      start: "2026-11-13T17:30:00",
      end: "2026-11-13T18:00:00",
      status: "agendado"
    }
  ];

  it("detecta sobreposicao", () => {
    expect(
      hasTimeConflict("2026-11-13T17:45:00", "2026-11-13T18:15:00", existing)
    ).toBe(true);
  });

  it("permite horario livre", () => {
    expect(
      hasTimeConflict("2026-11-13T18:00:00", "2026-11-13T18:30:00", existing)
    ).toBe(false);
  });

  it("ignora id excluido na remarcacao", () => {
    expect(
      hasTimeConflict(
        "2026-11-13T17:30:00",
        "2026-11-13T18:00:00",
        existing,
        "a1"
      )
    ).toBe(false);
  });

  it("ignora cancelados", () => {
    expect(
      hasTimeConflict("2026-11-13T17:30:00", "2026-11-13T18:00:00", [
        { ...existing[0], status: "cancelado" }
      ])
    ).toBe(false);
  });
});

describe("slots disponiveis", () => {
  it("gera slots de 30 min em janela de 2 horas", () => {
    const slots = buildAvailableSlots({
      dateStr: "2026-11-13",
      durationMinutes: 30,
      windows: [{ start: "09:00", end: "11:00" }],
      appointments: []
    });
    expect(slots.map((s) => s.label)).toEqual([
      "09:00",
      "09:30",
      "10:00",
      "10:30"
    ]);
  });

  it("remove slots ocupados", () => {
    const slots = buildAvailableSlots({
      dateStr: "2026-11-13",
      durationMinutes: 30,
      windows: [{ start: "09:00", end: "11:00" }],
      appointments: [
        {
          id: "1",
          start: "2026-11-13T09:30:00",
          end: "2026-11-13T10:00:00",
          status: "agendado"
        }
      ]
    });
    expect(slots.map((s) => s.label)).toEqual(["09:00", "10:00", "10:30"]);
  });

  it("retorna vazio sem janela ou duracao invalida", () => {
    expect(
      buildAvailableSlots({
        dateStr: "2026-11-13",
        durationMinutes: 30,
        windows: [],
        appointments: []
      })
    ).toEqual([]);
    expect(
      buildAvailableSlots({
        dateStr: "2026-11-13",
        durationMinutes: 0,
        windows: [{ start: "09:00", end: "10:00" }],
        appointments: []
      })
    ).toEqual([]);
  });
});

describe("mapeamento e filtros", () => {
  it("mapeia service availability appointment", () => {
    expect(
      mapService("s1", {
        userId: "u1",
        name: "massagem",
        durationMinutes: 30,
        price: 50,
        deleted: false
      })
    ).toMatchObject({
      id: "s1",
      userId: "u1",
      name: "massagem",
      durationMinutes: 30,
      price: 50,
      deleted: false
    });

    expect(
      mapAvailability("av1", {
        userId: "u1",
        weekday: "5",
        start: "09:00",
        end: "18:00"
      })
    ).toEqual({
      id: "av1",
      userId: "u1",
      weekday: 5,
      start: "09:00",
      end: "18:00"
    });

    expect(
      mapAppointment("ap1", {
        userId: "u1",
        serviceId: "s1",
        clientName: "Eloa",
        start: "2026-11-13T17:30:00",
        end: "2026-11-13T18:00:00",
        status: "agendado"
      })
    ).toMatchObject({
      id: "ap1",
      clientName: "Eloa",
      status: "agendado"
    });
  });

  it("filtra servicos ativos e agenda a partir de data", () => {
    expect(
      activeServices([
        { id: "1", deleted: false },
        { id: "2", deleted: true }
      ]).map((s) => s.id)
    ).toEqual(["1"]);

    expect(
      appointmentsFromDate(
        [
          { start: "2026-11-12T10:00:00" },
          { start: "2026-11-13T10:00:00" }
        ],
        "2026-11-13"
      )
    ).toHaveLength(1);
  });
});

describe("config e permissoes do modelo Forge", () => {
  it("valida config firebase completa", () => {
    expect(forgeConfigIsComplete({ apiKey: "COLE_AQUI" })).toBe(false);
    expect(
      forgeConfigIsComplete({
        apiKey: "AIza",
        authDomain: "x.firebaseapp.com",
        projectId: "forge-agenda-evn",
        appId: "1:123:web:abc"
      })
    ).toBe(true);
  });

  it("so o dono gerencia a agenda; cliente agenda sem login", () => {
    expect(canManageAgenda("uid-1", "uid-1")).toBe(true);
    expect(canManageAgenda("uid-1", "uid-2")).toBe(false);
    expect(canManageAgenda(null, "uid-1")).toBe(false);
    expect(clientCanCreateAppointment()).toBe(true);
  });
});

describe("validacoes de formulario", () => {
  it("valida servico", () => {
    expect(validateServiceInput({ name: "", durationMinutes: 30, price: "" }).ok).toBe(false);
    expect(validateServiceInput({ name: "Corte", durationMinutes: 7, price: "" }).ok).toBe(false);
    expect(validateServiceInput({ name: "Corte", durationMinutes: 30, price: -1 }).ok).toBe(false);
    expect(validateServiceInput({ name: "Corte", durationMinutes: 30, price: 50 }).ok).toBe(true);
  });

  it("valida disponibilidade", () => {
    expect(validateAvailabilityInput({ weekday: 1, start: "18:00", end: "09:00" }).ok).toBe(false);
    expect(validateAvailabilityInput({ weekday: 1, start: "09:00", end: "18:00" }).ok).toBe(true);
  });

  it("valida agendamento", () => {
    expect(
      validateBookingInput({
        userId: "",
        serviceId: "s1",
        dateStr: "2099-01-01",
        slot: "x|y",
        clientName: "Ana"
      }).ok
    ).toBe(false);
    expect(
      validateBookingInput({
        userId: "u1",
        serviceId: "s1",
        dateStr: "2099-01-01",
        slot: "x|y",
        clientName: "Ana"
      }).ok
    ).toBe(true);
  });
});