import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Slide } from '../../models/slide';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="buy-btn" (click)="onBuyClick()">
      Buy {{ (item )?.title }}
    </button>
  `,
  styles: [`
    .buy-btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #2b2b2b;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.2s, transform 0.1s;
    }
    .buy-btn:hover { background-color: #000; }
    .buy-btn:active { transform: scale(0.98); }
  `]
})
export class BuyButtonComponent {
  @Input() item!: Slide;
  @Output() purchase = new EventEmitter<Slide>();

  onBuyClick() {
    this.purchase.emit(this.item);
  }
}