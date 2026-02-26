import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Initialize the empty form with validation rules
    this.initForm();

    // 2. Check if we are in "Edit" mode by looking at the URL for an ID
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductData(this.productId);
    }
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      subtitle: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imgUrl: ['', Validators.required]
    });
  }

  private loadProductData(id: string): void {
    this.isLoading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        // Fill the form with the existing product data
        this.productForm.patchValue(product);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load product', err);
        this.isLoading = false;
        this.router.navigate(['/products']); // Go back if product doesn't exist
      }
    });
  }

  onSubmit(): void {
    // Stop if the form is invalid
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched(); // Show validation errors
      return;
    }

    this.isLoading = true;
    const formData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      // UPDATE existing product
      this.productService.updateProduct(this.productId, formData).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => { console.error('Update failed', err); this.isLoading = false; }
      });
    } else {
      // CREATE new product
      this.productService.createProduct(formData).subscribe({
        next: () => this.router.navigate(['/products']),
        error: (err) => { console.error('Create failed', err); this.isLoading = false; }
      });
    }
  }
}