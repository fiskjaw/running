import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CartService } from './core/services/cart.service'; 
import { ThemeService } from './core/services/theme.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Running';

  constructor(
    public cartService: CartService,
    public themeService: ThemeService,
    public authService: AuthService
  ) {}
}