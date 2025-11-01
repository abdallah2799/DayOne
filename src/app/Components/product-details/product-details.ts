import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(+id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        alert('Product not found');
        this.router.navigate(['/products']);
      }
    });
  }

  goBack() {
    if (this.authService.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/products']);
    }
  }

  editProduct() {
    this.router.navigate(['/edit-product', this.product?.id]);
  }

  deleteProduct() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.product!.id).subscribe({
        next: () => {
          if (this.authService.isAdmin) {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/products']);
          }
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product');
        }
      });
    }
  }
}
