import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  
  // Lazy Loaded Routes
  { 
    path: 'products', 
    loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductList) 
  },
  { 
    path: 'products/:id', 
    loadComponent: () => import('./features/products/product-detail/product-detail').then(m => m.ProductDetail) 
  },
  { 
    path: 'add-product', 
    canActivate: [adminGuard], 
    loadComponent: () => import('./features/admin/product-form/product-form').then(m => m.ProductFormComponent) 
  },
  { 
    path: 'edit-product/:id', 
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/product-form/product-form').then(m => m.ProductFormComponent) 
  },
 { 
    path: 'edit-product/:id', 
    loadComponent: () => import('./features/admin/product-form/product-form').then(m => m.ProductFormComponent) 
  },
  
  // 👇 ADD THIS CART ROUTE HERE 👇
  { 
    path: 'cart', 
    loadComponent: () => import('./features/cart/cart').then(m => m.CartComponent) 
  },
  
  // 404 Wildcard Route
  { 
    path: '**', 
    loadComponent: () => import('./features/errors/not-found/not-found').then(m => m.NotFound) 
  }, 
  // 404 Wildcard Route
  { 
    path: '**', 
    loadComponent: () => import('./features/errors/not-found/not-found').then(m => m.NotFound) 
  }
];