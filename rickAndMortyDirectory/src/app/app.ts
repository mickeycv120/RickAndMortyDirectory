import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { Card } from './components/card/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Card],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rickAndMortyDirectory');
}
