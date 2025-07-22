import { Component, ElementRef, ViewChild, OnDestroy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QrScannerService } from '../../services/qr-scanner.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-qr-scanner',
  imports: [CommonModule],
  templateUrl: './qr-scanner.html',
  styleUrl: './qr-scanner.scss'
})
export class QrScannerComponent implements OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
  private qrScannerService = inject(QrScannerService);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  isScanning = signal(false);
  error = signal<string | null>(null);
  scannedProfile = signal<any>(null);
  scanningInterval: any;

  async startScanning() {
    try {
      this.error.set(null);
      this.isScanning.set(true);
      
      const video = await this.qrScannerService.startCamera();
      this.videoElement.nativeElement.srcObject = video.srcObject;
      
      this.scanningInterval = setInterval(() => {
        this.scanFrame();
      }, 250);
      
    } catch (error) {
      console.error('Error starting camera:', error);
      this.error.set('Unable to access camera. Please check permissions.');
      this.isScanning.set(false);
    }
  }

  stopScanning() {
    this.isScanning.set(false);
    this.qrScannerService.stopCamera();
    if (this.scanningInterval) {
      clearInterval(this.scanningInterval);
      this.scanningInterval = null;
    }
  }

  private scanFrame() {
    if (!this.videoElement?.nativeElement) return;
    
    const result = this.qrScannerService.scanFrame(this.videoElement.nativeElement);
    if (result) {
      try {
        const profileData = JSON.parse(result);
        this.onQrCodeScanned(profileData);
      } catch (error) {
        console.error('Invalid QR code data:', error);
        this.error.set('Invalid QR code format');
      }
    }
  }

  private onQrCodeScanned(profileData: any) {
    this.stopScanning();
    this.scannedProfile.set(profileData);
  }

  addScannedProfile() {
    if (this.scannedProfile()) {
      this.profileService.addScannedProfile(this.scannedProfile());
      this.router.navigate(['/profiles']);
    }
  }

  scanAnother() {
    this.scannedProfile.set(null);
    this.error.set(null);
    this.startScanning();
  }

  navigateToProfiles() {
    this.router.navigate(['/profiles']);
  }

  ngOnDestroy() {
    this.stopScanning();
  }
}
