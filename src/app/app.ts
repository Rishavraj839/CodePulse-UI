import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/components/navbar/navbar';
import { ImageSelector } from './shared/components/image-selector/image-selector';
import { AuthService } from './features/auth/services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,ImageSelector],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CodePulse');

  authService = inject(AuthService);

  loadUserRef = this.authService.loadUser();
  user = this.loadUserRef.value;

  effectRef = effect(() => {
    const userValue = this.user();

    if (userValue) {
      this.authService.setUser(userValue);
    }
  });
} 
