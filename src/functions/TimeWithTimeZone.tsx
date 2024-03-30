function convertirAFechaUTC(date: Date): Date {
  // Obtener la diferencia en minutos entre la hora local y UTC
  const diff = date.getTimezoneOffset();
  console.log("hora", new Date(date.getTime() + diff * 60000));
  // Retornar la nueva fecha ajustada a UTC
  return new Date(date.getTime() - diff * 60000);
}

function aplicarZonaHoraria(date: Date, timezoneOffset: string): string {
  console.log("aqui", date.getTimezoneOffset());
  const [hours, minutes = "0"] = timezoneOffset.split(":");
  const totalOffset = parseInt(hours) * 60 + parseInt(minutes);
  console.log("totalOffset", totalOffset);
  // Aplicar el desfase al tiempo UTC
  const adjustedDate = new Date(date.getTime() + totalOffset * 60000);
  console.log("adjustedDate", adjustedDate);
  console.log("adjustedDate UTC", adjustedDate.getUTCDate());
  console.log("date UTC", date.getUTCDate());

  // Comparar las fechas para ver si cruzó al día siguiente
  const dayIndicator =
    adjustedDate.getUTCDate() < date.getUTCDate() ? "" : "+1";

  return adjustedDate.toISOString().substring(11, 16) + dayIndicator;
}

export const TimeWithTimeZone = (date: Date, timezoneOffset: string) => {
  // const dateUTC = convertirAFechaUTC(date);
  return aplicarZonaHoraria(date, timezoneOffset);
};
