import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cursol } from './Components/cursol/cursol';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Cursol],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DayOne');
}
