import { Directive, HostListener, Input } from '@angular/core';

@Directive({ selector: '[toggleDescription]', standalone: true })
export class ToggleDescriptionDirective {
  @Input('toggleDescription') expanded!: boolean;

  @HostListener('click')
  toggle() {
    this.expanded = !this.expanded;
  }
}