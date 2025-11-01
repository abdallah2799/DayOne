import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product';
import { AuthService } from '../../services/auth.service';
import { Product } from '../../Models/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: ['']
  };
  
  isEditMode = false;
  categories: { id: string; name: string }[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories = this.productService.getCategories().filter(c => c.id !== 'all');
    
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(+id).subscribe({
        next: (foundProduct) => {
          if (foundProduct) {
            this.product = { ...foundProduct };
          }
        },
        error: (error) => console.error('Error loading product:', error)
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          this.router.navigate(['/admin-dashboard']);
        },
        error: (error) => {
          console.error('Error updating product:', error);
          alert('Failed to update product');
        }
      });
    } else {
      const { id, ...productData } = this.product;
      this.productService.addProduct(productData).subscribe({
        next: () => {
          this.router.navigate(['/admin-dashboard']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
          alert('Failed to add product');
        }
      });
    }
  }

  cancel() {
    // Navigate back based on user role
    if (this.authService.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
