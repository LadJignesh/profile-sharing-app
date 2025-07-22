import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile.interface';

@Component({
  selector: 'app-profile-list',
  imports: [CommonModule],
  templateUrl: './profile-list.html',
  styleUrl: './profile-list.scss'
})
export class ProfileListComponent {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);
  
  profiles = this.profileService.getProfiles();
  currentUser = this.authService.getCurrentUser();
  
  hasProfiles = computed(() => this.profiles().length > 0);
  hasCurrentUser = computed(() => this.currentUser() !== null);

  navigateToCreate() {
    this.router.navigate(['/create-profile']);
  }

  navigateToScanner() {
    this.router.navigate(['/qr-scanner']);
  }

  navigateToProfile(profile: Profile) {
    this.router.navigate(['/profile', profile.id]);
  }

  deleteProfile(profile: Profile, event: Event) {
    event.stopPropagation();
    if (confirm(`Are you sure you want to delete ${profile.name}'s profile?`)) {
      this.profileService.deleteProfile(profile.id);
    }
  }

  // Removed setAsCurrentUser method since it's no longer needed
  // Users can only manage their own profiles now
}
