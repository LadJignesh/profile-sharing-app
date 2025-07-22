import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = signal({
    username: '',
    password: ''
  });

  isLoading = signal(false);
  error = signal<string | null>(null);

  async onSubmit() {
    if (!this.credentials().username || !this.credentials().password) {
      this.error.set('Please fill in all fields');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result = await this.authService.login(this.credentials());
      
      if (result.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set(result.error || 'Login failed');
      }
    } catch (error) {
      this.error.set('An unexpected error occurred');
    } finally {
      this.isLoading.set(false);
    }
  }

  updateCredentials(field: string, value: string) {
    this.credentials.update(current => ({ ...current, [field]: value }));
  }
}
