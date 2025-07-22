import { Component, computed, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/profile.interface';

@Component({
  selector: 'app-profile-detail',
  imports: [CommonModule],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  profiles = this.profileService.getProfiles();
  currentUser = this.authService.getCurrentUser();
  
  profile = computed(() => {
    const id = this.route.snapshot.params['id'];
    return this.profiles().find(p => p.id === id) || null;
  });

  isOwner = computed(() => 
    this.currentUser()?.id === this.profile()?.userId
  );

  ngOnInit() {
    // Check if profile exists, if not redirect to dashboard
    if (!this.profile()) {
      this.router.navigate(['/dashboard']);
    }
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  deleteProfile() {
    if (this.profile() && this.isOwner() && confirm(`Are you sure you want to delete this profile?`)) {
      this.profileService.deleteProfile(this.profile()!.id);
      this.router.navigate(['/dashboard']);
    }
  }

  downloadQR() {
    const profile = this.profile();
    if (isPlatformBrowser(this.platformId) && profile?.qrCode) {
      const link = document.createElement('a');
      link.download = `${profile.name}-qr-code.png`;
      link.href = profile.qrCode;
      link.click();
    }
  }

  canShare() {
    return isPlatformBrowser(this.platformId) && typeof navigator !== 'undefined' && navigator.share;
  }

  shareProfile() {
    if (isPlatformBrowser(this.platformId) && navigator.share && this.profile()) {
      const profile = this.profile()!;
      navigator.share({
        title: `${profile.name}'s Profile`,
        text: `Check out ${profile.name}'s contact information`,
        url: window.location.href
      }).catch(console.error);
    }
  }

  openEmail() {
    if (isPlatformBrowser(this.platformId) && this.profile()?.email) {
      window.open(`mailto:${this.profile()!.email}`);
    }
  }

  openPhone() {
    if (isPlatformBrowser(this.platformId) && this.profile()?.phone) {
      window.open(`tel:${this.profile()!.phone}`);
    }
  }

  openWebsite() {
    if (isPlatformBrowser(this.platformId) && this.profile()?.website) {
      window.open(this.profile()!.website, '_blank');
    }
  }

  openLinkedIn() {
    if (isPlatformBrowser(this.platformId) && this.profile()?.linkedin) {
      window.open(this.profile()!.linkedin, '_blank');
    }
  }

  openTwitter() {
    if (isPlatformBrowser(this.platformId) && this.profile()?.twitter) {
      window.open(this.profile()!.twitter, '_blank');
    }
  }
}
