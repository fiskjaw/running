import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-buy-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="buy-btn" (click)="onBuyClick()">
      Buy {{ item.title }}
    </button>
  `,
  styles: [`
    .buy-btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #1a1a1a;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: background-color 0.2s ease, transform 0.1s ease;
      margin-top: 10px;
    }
    .buy-btn:hover { 
      background-color: #333; 
    }
    .buy-btn:active { 
      transform: scale(0.98); 
    }
  `]
})
export class BuyButtonComponent {
  // Uses the strict Product interface
  @Input() item!: Product; 
  @Output() purchase = new EventEmitter<Product>();

  onBuyClick() {
    // Safety check before emitting the event
    if (this.item) {
      this.purchase.emit(this.item);
    }
  }
}