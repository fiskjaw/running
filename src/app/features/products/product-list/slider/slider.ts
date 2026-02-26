import { Component } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { CommonModule } from '@angular/common';
import { TruncateWordsPipe } from '../../../../shared/pipes/truncate-words.pipe';
import { CardHighlightDirective } from '../../../../shared/directives/card-highlight.directive';
import { BuyButtonComponent } from '../../../../shared/components/buy-button/buy-button';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TruncateWordsPipe, CardHighlightDirective, BuyButtonComponent],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class Slider {
 public carouselData: Product[] = [
    {
      id: '1',
      title: 'Outdoor Running Set',
      subtitle: 'Endurance Kit',
      price: 59.99,
      description: 'Matching long-sleeve performance top and athletic shorts designed for outdoor endurance running in cooler climates.',
      imgUrl: 'assets/images/a1.webp'
    },
    {
      id: '2',
      title: 'Oversized Sweatsuit',
      subtitle: 'Relaxed Fit Sweats',
      price: 65.00,
      description: 'Comfortable, oversized dark hoodie and matching sweatpants perfect for rest days, warm-ups, or casual streetwear.',
      imgUrl: 'assets/images/a2.webp'
    },
    {
      id: '3',
      title: 'Training Tank & Shorts',
      subtitle: 'Navy Training Kit',
      price: 45.00,
      description: 'Lightweight navy blue sleeveless training top and matching athletic shorts engineered for unrestricted movement in the gym.',
      imgUrl: 'assets/images/a3.webp'
    },
    {
      id: '4',
      title: 'Drop-Arm Tank Top',
      subtitle: 'Relentless Tank',
      price: 29.99,
      description: 'Breathable sleeveless tank with dropped armholes for maximum airflow, perfectly paired with double-layer performance shorts.',
      imgUrl: 'assets/images/a4.webp'
    },
    {
      id: '5',
      title: 'Compression Base Layer',
      subtitle: 'Performance Base',
      price: 49.99,
      description: 'Fitted long-sleeve performance base layer top paired with athletic shorts, offering muscle support for outdoor training.',
      imgUrl: 'assets/images/a5.webp'
    },
    {
      id: '6',
      title: 'Urban Activewear Set',
      subtitle: 'Mint City Set',
      price: 55.00,
      description: 'Stylish light mint green long-sleeve top and shorts matching set, perfect for urban running or everyday athletic wear.',
      imgUrl: 'assets/images/a6.webp'
    }
  ];

  public activePosition: number = 0;
  
  // Tracks the index of items where the description is fully visible
  public expandedItems: Set<number> = new Set<number>();

  // Returns exactly 3 items starting from the active position
  get visibleSlides(): Product[] {
    const total = this.carouselData.length;
    return [
      this.carouselData[this.activePosition % total],
      this.carouselData[(this.activePosition + 1) % total],
      this.carouselData[(this.activePosition + 2) % total],
    ];
  }

  public handleNext(): void {
    this.activePosition = (this.activePosition + 1) % this.carouselData.length;
    this.expandedItems.clear(); // Reset text expansion when sliding
  }

  public handlePrev(): void {
    this.activePosition = (this.activePosition - 1 + this.carouselData.length) % this.carouselData.length;
    this.expandedItems.clear();
  }

  public toggleDescription(index: number): void {
    if (this.expandedItems.has(index)) {
      this.expandedItems.delete(index);
    } else {
      this.expandedItems.add(index);
    }
  }

  public onProductBuy(item: Product): void {
    alert(`Added ${item.title} to cart for ${item.price}!`);
  }
}