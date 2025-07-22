import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import jsQR from 'jsqr';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  private platformId = inject(PLATFORM_ID);
  private video: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private canvasContext: CanvasRenderingContext2D | null = null;
  private stream: MediaStream | null = null;

  async startCamera(): Promise<HTMLVideoElement> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Camera is not available on the server');
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      this.video = document.createElement('video');
      this.video.srcObject = this.stream;
      this.video.setAttribute('playsinline', 'true');
      await this.video.play();

      return this.video;
    } catch (error) {
      console.error('Error accessing camera:', error);
      throw error;
    }
  }

  stopCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.video) {
      this.video = null;
    }
  }

  scanFrame(video: HTMLVideoElement): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvasContext = this.canvas.getContext('2d');
    }

    if (!this.canvasContext) return null;

    this.canvas.width = video.videoWidth;
    this.canvas.height = video.videoHeight;
    
    this.canvasContext.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
    
    const imageData = this.canvasContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    
    return code ? code.data : null;
  }
}
