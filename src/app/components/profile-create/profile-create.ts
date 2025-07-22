import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.interface';

@Component({
  selector: 'app-profile-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-create.html',
  styleUrl: './profile-create.scss'
})
export class ProfileCreateComponent {
  private profileService = inject(ProfileService);
  private router = inject(Router);

  profile = signal({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    bio: '',
    website: '',
    linkedin: '',
    twitter: ''
  });

  isLoading = signal(false);
  createdProfile = signal<Profile | null>(null);

  async onSubmit() {
    if (!this.profile().name || !this.profile().email) {
      alert('Name and email are required!');
      return;
    }

    this.isLoading.set(true);
    
    try {
      const newProfile = await this.profileService.createProfile(this.profile());
      this.createdProfile.set(newProfile);
      this.isLoading.set(false);
      
      // Redirect to dashboard after successful creation
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
      this.isLoading.set(false);
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  updateProfile(field: string, value: string) {
    this.profile.update(current => ({ ...current, [field]: value }));
  }
}
