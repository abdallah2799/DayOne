import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../Models/product';
import { ShortenDescriptionPipe } from '../../pipes/shorten-description-pipe';
import { HoverCardDirective } from '../../directives/hover-card'; // ✅ استيراد الدايركتيف

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
  imports: [ShortenDescriptionPipe, HoverCardDirective], // ✅ إضافته هنا
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() buy = new EventEmitter<Product>();
  isExpanded = false;

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  handleBuy() {
    this.buy.emit(this.product);
  }
}