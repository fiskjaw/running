import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Slider } from './slider';

describe('Slider Component Setup', () => {
  let fixture: ComponentFixture<Slider>;
  let componentInstance: Slider;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Slider]
    }).compileComponents();

    fixture = TestBed.createComponent(Slider);
    componentInstance = fixture.componentInstance;
    
    // Trigger initial data binding
    fixture.detectChanges(); 
    await fixture.whenStable();
  });

  it('should initialize successfully', () => {
    expect(componentInstance).toBeDefined();
  });
});