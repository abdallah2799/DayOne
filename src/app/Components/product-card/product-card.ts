import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../../Models/product';
import { ShortenDescriptionPipe } from '../../pipes/shorten-description-pipe';
import { HoverCardDirective } from '../../directives/hover-card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
  imports: [CommonModule, ShortenDescriptionPipe, HoverCardDirective],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() buy = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();
  isExpanded = false;

  constructor(private router: Router, public authService: AuthService) {}

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  handleBuy() {
    this.buy.emit(this.product);
  }

  viewDetails() {
    this.router.navigate(['/product', this.product.id]);
  }

  editProduct() {
    this.router.navigate(['/edit-product', this.product.id]);
  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.delete.emit(this.product.id);
    }
  }
}