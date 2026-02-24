import { Component } from '@angular/core';
import { Slider } from './components/slider/slider';

@Component({
  selector: 'app-root',
  imports: [Slider],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Clothes';
}
