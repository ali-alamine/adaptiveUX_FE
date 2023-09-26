import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimString',
  standalone:true
})
export class TrimStringPipe implements PipeTransform {

  transform(value: any, limit?: number, ellipsis?: string): string {
    if (typeof value !== 'string' && typeof value !== 'number') {
      return ''; // Return an empty string for non-string and non-numeric values
    }

    const stringValue = String(value); // Convert to string if value is numeric
    if (limit === undefined) {
      limit = 100;
    }

    if (ellipsis === undefined) {
      ellipsis = '...';
    }

    const trimmedString = stringValue.slice(0, limit).trim();

    if (trimmedString.length === stringValue.length) {
      return trimmedString;
    }

    return `${trimmedString}${ellipsis}`;
  }

}
