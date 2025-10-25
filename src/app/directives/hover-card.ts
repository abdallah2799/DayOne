import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverCard]',
  standalone: true
})
export class HoverCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.03)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 8px 16px rgba(0,0,0,0.2)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease, box-shadow 0.3s ease');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}