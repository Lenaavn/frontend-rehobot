import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatEnum',
  standalone: false
})
export class FormatEnumPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Reemplazar "_" por espacios y capitalizar
    let formattedValue = value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

    // Solo reemplazar la última "n" de "Pequeño" si existe en el texto
    if (formattedValue.includes("Pequeno")) {
      formattedValue = formattedValue.replace(/Pequeno\b/, "Pequeño");
    }

    return formattedValue;
  }

}
