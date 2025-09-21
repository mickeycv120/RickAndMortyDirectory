import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { RouterOutlet } from '@angular/router';
import { Card } from './components/card/card';
import { CharacterFilters, Character } from './Types/characterType';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DetailsModal } from './modals/details-modal/details-modal';

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

  constructor(private dialog: MatDialog) {}

  // Método que se ejecuta cuando el header emite cambios de filtros
  onFiltersChange(filters: CharacterFilters) {
    this.currentFilters = { ...filters };
    this.filtersSubject.next(filters);
  }

  // Método para recibir el total count desde Card
  onDataChange(data: { totalCount: number }) {
    this.totalCount = data.totalCount;
  }

  // Método para manejar el clic en una card de personaje
  onCharacterClick(character: Character) {
    console.log('Character clicked:', character);

    // Abrir el modal de detalles
    const dialogRef = this.dialog.open(DetailsModal, {
      width: '90vw', // hasta 90% del ancho de la pantalla
      maxWidth: '800px', // no crece más de 800px en pantallas grandes
      height: 'auto', // altura automática según contenido
      maxHeight: '90vh', // no se salga del 90% de la altura de la pantalla
      panelClass: 'custom-dialog-container',
      data: { character },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal cerrado');
    });
  }
}
