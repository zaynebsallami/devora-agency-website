import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'nl2br' })
export class Nl2BrPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;
    const withBreaks = value.replace(/\n/g, '<br/>');
    return this.sanitizer.bypassSecurityTrustHtml(withBreaks);
  }
}
