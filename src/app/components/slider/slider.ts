// These should all work perfectly based on your current file tree:
import { Component } from '@angular/core';
import { Slide } from '../../models/slide'; 
import { CommonModule } from '@angular/common';
import { TruncateWordsPipe } from '../../pipes/truncate-words.pipe';
import { CardHighlightDirective } from '../../directives/card-highlight.directive';
import { BuyButtonComponent } from '../buy-button/buy-button';
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, TruncateWordsPipe, CardHighlightDirective, BuyButtonComponent],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class Slider {
 public carouselData: Slide[] = [
    // a1: Two men running on a road in long-sleeve tops and shorts
    new Slide('assets/images/a1.webp', 'Outdoor Running Set', 'Endurance Kit', 59.99, 'Matching long-sleeve performance top and athletic shorts designed for outdoor endurance running in cooler climates.'),
    
    // a2: Man in oversized dark hoodie and sweatpants
    new Slide('assets/images/a2.webp', 'Oversized Sweatsuit', 'Relaxed Fit Sweats', 65.00, 'Comfortable, oversized dark hoodie and matching sweatpants perfect for rest days, warm-ups, or casual streetwear.'),
    
    // a3: Man in navy blue sleeveless top and shorts
    new Slide('assets/images/a3.webp', 'Training Tank & Shorts', 'Navy Training Kit', 45.00, 'Lightweight navy blue sleeveless training top and matching athletic shorts engineered for unrestricted movement in the gym.'),
    
    // a4: Grid showing drop-arm tank tops and double-layer shorts
    new Slide('assets/images/a4.webp', 'Drop-Arm Tank Top', 'Relentless Tank', 29.99, 'Breathable sleeveless tank with dropped armholes for maximum airflow, perfectly paired with double-layer performance shorts.'),
    
    // a5: Men in fitted long-sleeve tops and shorts in a landscape
    new Slide('assets/images/a5.webp', 'Compression Base Layer', 'Performance Base', 49.99, 'Fitted long-sleeve performance base layer top paired with athletic shorts, offering muscle support for outdoor training.'),
    
    // a6: Man in mint green long-sleeve set walking in the city
    new Slide('assets/images/a6.webp', 'Urban Activewear Set', 'Mint City Set', 55.00, 'Stylish light mint green long-sleeve top and shorts matching set, perfect for urban running or everyday athletic wear.')
  ];

  public activePosition: number = 0;
  
  // Tracks the index of items where the description is fully visible
  public expandedItems: Set<number> = new Set<number>();

  // Returns exactly 3 items starting from the active position
  get visibleSlides(): Slide[] {
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

  public onProductBuy(item: Slide): void {
    alert(`Added ${item.title} to cart for $${item.price}!`);
  }
}