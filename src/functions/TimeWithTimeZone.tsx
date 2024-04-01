function convertirAFechaUTC(date: Date): Date {
  // Obtener la diferencia en minutos entre la hora local y UTC
  const diff = date.getTimezoneOffset();
  console.log("hora", new Date(date.getTime() + diff * 60000));
  // Retornar la nueva fecha ajustada a UTC
  return new Date(date.getTime() - diff * 60000);
}

function aplicarZonaHoraria(date: Date, timezoneOffset: string): string {

  const [hours, minutes = "0"] = timezoneOffset.split(":");
  const totalOffset = parseInt(hours) * 60 + parseInt(minutes);
  

  const adjustedDate = new Date(date.getTime() + totalOffset * 60000);


  const dayIndicator =
    adjustedDate.getUTCDate() <= date.getUTCDate() ? "" : "+1";

  return adjustedDate.toISOString().substring(11, 16) + dayIndicator;
}

export const TimeWithTimeZone = (date: Date, timezoneOffset: string) => {

  return aplicarZonaHoraria(date, timezoneOffset);
};
