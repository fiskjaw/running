import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router'; 
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service'; 
import { Product } from '../../../models/product.model'; 
import { BuyButtonComponent } from '../../../shared/components/buy-button/buy-button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BuyButtonComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public searchTerm: string = '';
  public isLoading: boolean = true;
  public errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  public filterProducts(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(p => 
      p.title.toLowerCase().includes(term) || 
      p.subtitle.toLowerCase().includes(term)
    );
  }

  public onProductBuy(item: Product): void {
    this.cartService.addToCart(item);
  }

  public deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts(); // Instantly refreshes the grid!
        },
        error: (err) => console.error('Delete failed', err)
      });
    }
  }
}