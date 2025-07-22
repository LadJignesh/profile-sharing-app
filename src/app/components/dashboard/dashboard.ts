import { Component, signal, inject, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.interface';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  userMainProfile = signal<Profile | null>(null);
  userProfiles = signal<Profile[]>([]);
  sharedProfiles = signal<Profile[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    const user = this.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    // Get user's main profile (first one they created)
    const allProfiles = this.profileService.getProfiles()();
    const userProfiles = allProfiles.filter(p => p.userId === user.id);
    const sharedProfiles = allProfiles.filter(p => 
      p.sharedBy && p.sharedBy !== user.id && p.isShared
    );

    this.userMainProfile.set(userProfiles.length > 0 ? userProfiles[0] : null);
    this.userProfiles.set(userProfiles);
    this.sharedProfiles.set(sharedProfiles);
    this.isLoading.set(false);
  }

  logout() {
    this.authService.logout();
  }

  goToCreateProfile() {
    this.router.navigate(['/create-profile']);
  }

  goToQrScanner() {
    this.router.navigate(['/qr-scanner']);
  }

  viewProfile(profileId: string) {
    this.router.navigate(['/profile', profileId]);
  }

  deleteSharedProfile(profileId: string) {
    this.profileService.deleteProfile(profileId);
    this.loadDashboardData(); // Refresh the data
  }

  hasUserProfile = computed(() => this.userMainProfile() !== null);
  hasSharedProfiles = computed(() => this.sharedProfiles().length > 0);
}
