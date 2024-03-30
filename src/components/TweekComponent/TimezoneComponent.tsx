import React from 'react';
import Data from '../../DATA/contries.json';

function convertirAFechaUTC(date: Date): Date {
  // Obtener la diferencia en minutos entre la hora local y UTC
  const diff = date.getTimezoneOffset();
  
  // Retornar la nueva fecha ajustada a UTC
  return new Date(date.getTime() - diff * 60000);
}

function aplicarZonaHoraria(date: Date, timezoneOffset: string): string {
  // Convertir el desfase de zona horaria a minutos
  console.log(timezoneOffset);
  const [hours, minutes = '0'] = timezoneOffset.split(':');
  const totalOffset = parseInt(hours) * 60 + parseInt(minutes);
  // Aplicar el desfase al tiempo UTC
  const adjustedDate = new Date(date.getTime() + totalOffset * 60000);

  // Comparar las fechas para ver si cruzó al día siguiente
  const dayIndicator = adjustedDate.getUTCDate() !== date.getUTCDate() ? '+1' : '';
  
  return adjustedDate.toISOString().substring(11, 16) + dayIndicator;
}

function TimezoneComponent() {
  // Ordenando los datos por 'name.common' en orden alfabético (A-Z)
  const dataOrdenada = Data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  console.log('Hola')
  return (
    <div>
      {dataOrdenada.map((post) => (
        <div key={post.cca2}>
          <h1>
            <span>{post.flag}</span>
            {post.name.common} ({
              // Uniendo todas las zonas horarias con ', '
              post.timezones.map(timezone => timezone.includes('UTC') ? timezone : `UTC ${timezone}`).join(', ')
            })
          </h1>
        </div>
      ))}
    </div>
  );
}
export default TimezoneComponent;
