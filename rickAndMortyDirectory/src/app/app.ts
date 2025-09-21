import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { Card } from './components/card/card';
import { CharacterFilters } from './Types/characterType';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Card],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('rickAndMortyDirectory');

  // Estado compartido de filtros usando BehaviorSubject para comunicación reactiva
  private filtersSubject = new BehaviorSubject<CharacterFilters>({
    name: '',
    status: '',
    species: '',
  });

  currentFilters$ = this.filtersSubject.asObservable();
  currentFilters: CharacterFilters = {
    name: '',
    status: '',
    species: '',
  };
  totalCount = 0;

  // Método que se ejecuta cuando el header emite cambios de filtros
  onFiltersChange(filters: CharacterFilters) {
    this.currentFilters = { ...filters };
    this.filtersSubject.next(filters);
  }

  // Método para recibir el total count desde Card
  onDataChange(data: { totalCount: number }) {
    this.totalCount = data.totalCount;
  }
}
