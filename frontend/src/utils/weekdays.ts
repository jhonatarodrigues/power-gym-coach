import type { Weekday } from "@/types";

const weekdayLabels: Record<Weekday, string> = {
  monday: "Segunda-feira",
  tuesday: "Terca-feira",
  wednesday: "Quarta-feira",
  thursday: "Quinta-feira",
  friday: "Sexta-feira",
  saturday: "Sabado",
  sunday: "Domingo",
};

const jsDayToWeekday: Weekday[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function getWeekdayLabel(weekday: Weekday) {
  return weekdayLabels[weekday];
}

export function getCurrentWeekday(date = new Date()): Weekday {
  return jsDayToWeekday[date.getDay()] ?? "monday";
}
