import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  templateUrl: './error-page.html',
  styleUrls: ['./error-page.css']
})
export class ErrorPageComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
