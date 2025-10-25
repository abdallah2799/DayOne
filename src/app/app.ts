import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cursol } from './Components/cursol/cursol';
import { ProductListComponent } from './Components/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Cursol,ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DayOne');
}
