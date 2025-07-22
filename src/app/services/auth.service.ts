import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { User, LoginCredentials, RegisterData } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private currentUser = signal<User | null>(null);
  private users = signal<User[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    }
  }

  getCurrentUser() {
    return this.currentUser.asReadonly();
  }

  isAuthenticated() {
    return this.currentUser() !== null;
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> {
    const users = this.users();
    const user = users.find(u => u.username === credentials.username);

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (user.password !== credentials.password) {
      return { success: false, error: 'Invalid password' };
    }

    this.currentUser.set(user);
    this.saveCurrentUserToLocalStorage();
    
    return { success: true };
  }

  async register(data: RegisterData): Promise<{ success: boolean; error?: string }> {
    const users = this.users();
    
    // Check if username already exists
    if (users.find(u => u.username === data.username)) {
      return { success: false, error: 'Username already exists' };
    }

    // Check if email already exists
    if (users.find(u => u.email === data.email)) {
      return { success: false, error: 'Email already exists' };
    }

    const newUser: User = {
      id: this.generateId(),
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date()
    };

    this.users.update(users => [...users, newUser]);
    this.currentUser.set(newUser);
    
    this.saveUsersToLocalStorage();
    this.saveCurrentUserToLocalStorage();

    return { success: true };
  }

  logout(): void {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/login']);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveUsersToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('users', JSON.stringify(this.users()));
    }
  }

  private saveCurrentUserToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser()));
    }
  }

  private loadFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Load users
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        this.users.set(users);
      }

      // Load current user
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
      }
    }
  }
}
