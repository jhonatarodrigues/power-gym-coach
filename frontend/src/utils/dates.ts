export function formatDateBR(value?: string | null) {
  if (!value) {
    return "--/--/----";
  }

  const normalizedValue = value.length === 10 ? `${value}T12:00:00` : value;
  const date = new Date(normalizedValue);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function normalizeDateInputToISO(value: string) {
  const trimmedValue = value.trim();

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmedValue)) {
    const [day, month, year] = trimmedValue.split("/");
    return `${year}-${month}-${day}`;
  }

  return trimmedValue;
}

export function formatDateTimeBR(value?: string | null) {
  if (!value) {
    return "--/--/---- --:--";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
