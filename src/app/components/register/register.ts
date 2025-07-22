import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerData = signal({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  isLoading = signal(false);
  error = signal<string | null>(null);

  async onSubmit() {
    const data = this.registerData();
    
    // Validation
    if (!data.username || !data.email || !data.password || !data.confirmPassword) {
      this.error.set('Please fill in all fields');
      return;
    }

    if (data.password !== data.confirmPassword) {
      this.error.set('Passwords do not match');
      return;
    }

    if (data.password.length < 6) {
      this.error.set('Password must be at least 6 characters long');
      return;
    }

    if (!this.isValidEmail(data.email)) {
      this.error.set('Please enter a valid email address');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result = await this.authService.register({
        username: data.username,
        email: data.email,
        password: data.password
      });
      
      if (result.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error.set(result.error || 'Registration failed');
      }
    } catch (error) {
      this.error.set('An unexpected error occurred');
    } finally {
      this.isLoading.set(false);
    }
  }

  updateRegisterData(field: string, value: string) {
    this.registerData.update(current => ({ ...current, [field]: value }));
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
