import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Profile } from '../models/profile.interface';
import { AuthService } from './auth.service';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private platformId = inject(PLATFORM_ID);
  private authService = inject(AuthService);
  private profiles = signal<Profile[]>([]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadFromLocalStorage();
    }
  }

  getProfiles() {
    return this.profiles.asReadonly();
  }

  // Get user's own profiles
  getUserProfiles() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser()) return signal([]);
    
    return signal(this.profiles().filter(p => p.userId === currentUser()!.id));
  }

  // Get shared profiles from others
  getSharedProfiles() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser()) return signal([]);
    
    return signal(this.profiles().filter(p => 
      p.sharedBy && p.sharedBy !== currentUser()!.id
    ));
  }

  // Get user's main profile (first one they created)
  getUserMainProfile() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser()) return signal(null);
    
    const userProfiles = this.profiles().filter(p => p.userId === currentUser()!.id);
    return signal(userProfiles.length > 0 ? userProfiles[0] : null);
  }

  async createProfile(profileData: Omit<Profile, 'id' | 'userId' | 'createdAt' | 'qrCode' | 'isShared'>): Promise<Profile> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser()) {
      throw new Error('User must be logged in to create a profile');
    }

    const profile: Profile = {
      ...profileData,
      id: this.generateId(),
      userId: currentUser()!.id,
      createdAt: new Date(),
      isShared: true // Default to shared
    };

    // Generate QR code for the profile
    const qrData = JSON.stringify({
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      company: profile.company,
      title: profile.title,
      isShared: profile.isShared
    });

    try {
      profile.qrCode = await QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }

    this.profiles.update(profiles => [...profiles, profile]);
    this.saveToLocalStorage();
    
    return profile;
  }

  addScannedProfile(profileData: any): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser() || !profileData.isShared) return;
    
    // Check if profile already exists
    const existingProfile = this.profiles().find(p => p.id === profileData.id);
    if (existingProfile) return;

    const profile: Profile = {
      ...profileData,
      sharedBy: profileData.userId, // Original owner
      createdAt: new Date(profileData.createdAt || new Date()),
      bio: profileData.bio || '',
      website: profileData.website || '',
      linkedin: profileData.linkedin || '',
      twitter: profileData.twitter || ''
    };
    
    this.profiles.update(profiles => [...profiles, profile]);
    this.saveToLocalStorage();
  }

  updateProfileSharing(profileId: string, isShared: boolean): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser()) return;

    this.profiles.update(profiles => 
      profiles.map(p => {
        if (p.id === profileId && p.userId === currentUser()!.id) {
          return { ...p, isShared };
        }
        return p;
      })
    );
    this.saveToLocalStorage();
  }

  deleteProfile(id: string): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser()) return;

    this.profiles.update(profiles => 
      profiles.filter(p => !(p.id === id && (p.userId === currentUser()!.id || p.sharedBy)))
    );
    this.saveToLocalStorage();
  }

  updateProfile(updatedProfile: Profile): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser() || updatedProfile.userId !== currentUser()!.id) return;

    this.profiles.update(profiles => 
      profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p)
    );
    this.saveToLocalStorage();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveToLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('profiles', JSON.stringify(this.profiles()));
    }
  }

  private loadFromLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('profiles');
      if (stored) {
        const profiles = JSON.parse(stored);
        this.profiles.set(profiles);
      }
    }
  }
}
