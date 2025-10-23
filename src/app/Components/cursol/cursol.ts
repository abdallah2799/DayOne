import { Component } from '@angular/core';
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

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  playCarousel() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        console.log(this.currentIndex)
        // document.getElementById("next")?.click()
        this.nextImage();
      }, 500); // change every 0.5 seconds
    }
  }

  stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}