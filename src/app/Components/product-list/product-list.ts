import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../Models/product';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  imports: [CommonModule,ProductCardComponent],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: { id: string; name: string }[] = [];
  selectedCategory = 'all';
  totalPrice = 0;

  constructor(private productService: ProductService) {
    // Use effect to react to signal changes
    effect(() => {
      this.products = this.productService.products();
      this.filter(this.selectedCategory);
      this.categories = this.productService.getCategories();
    });
  }

  ngOnInit() {
    // Initial load handled by effect
  }

  filter(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filtered = categoryId === 'all'
      ? this.products
      : this.products.filter(p => p.category === categoryId);
  }

  handleBuy(product: Product) {
    this.totalPrice += product.price;
  }

  handleDelete(id: number) {
    this.productService.deleteProduct(id);
    this.products = this.productService.products();
    this.filter(this.selectedCategory);
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.filter(select.value);
  }
}




