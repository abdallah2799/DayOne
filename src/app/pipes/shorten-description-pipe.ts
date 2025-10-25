import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'shortenDescription' })
export class ShortenDescriptionPipe implements PipeTransform {
  transform(value: string, expanded: boolean): string {
    if (expanded) return value;
    const words = value.split(' ');
    return words.slice(0, 3).join(' ') + '...';
  }
}