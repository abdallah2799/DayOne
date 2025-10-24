import { Component, ChangeDetectorRef } from '@angular/core';
import { CursolImages } from '../../Models/cursol-images';

@Component({
  selector: 'app-cursol',
  standalone: true,
  templateUrl: './cursol.html',
  styleUrls: ['./cursol.css'],
})
export class Cursol {
  images = new CursolImages().imageUrls;
  currentIndex = 0;
  intervalId: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  nextImage(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.cdr.detectChanges(); // force UI update
  }

  prevImage(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.cdr.detectChanges(); // force UI update
  }

  playCarousel(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.nextImage();
      }, 1000); // 1 second
    }
  }

  stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}