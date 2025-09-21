import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Character, CharacterFilters, CharactersResponse } from '../../Types/characterType';
import { RickMortyService } from '../../api/api';
import { BehaviorSubject, Observable, switchMap, map, startWith, catchError, of } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  private pageSubject = new BehaviorSubject<number>(1);
  private filtersSubject = new BehaviorSubject<CharacterFilters>({
    name: '',
    status: '',
    species: '',
  });

  // Observable que combina página y filtros para obtener personajes
  data$: Observable<{ characters: Character[]; totalCount: number; isLoading: boolean }> =
    this.pageSubject.pipe(
      switchMap((page) =>
        this.filtersSubject.pipe(
          switchMap((filters) => {
            return this.rickMortyService.getCharacters(page, filters).pipe(
              map((response: CharactersResponse) => ({
                characters: response.results,
                totalCount: response.info.count,
                isLoading: false,
              })),
              startWith({ characters: [], totalCount: 0, isLoading: true }),
              catchError((error) => {
                console.error('Error loading characters:', error);
                return of({ characters: [], totalCount: 0, isLoading: false });
              })
            );
          })
        )
      )
    );

  currentPage$ = this.pageSubject.asObservable();

  constructor(private rickMortyService: RickMortyService) {}

  trackByCharacter(index: number, character: Character): number {
    return character.id;
  }

  onFiltersChange(filters: CharacterFilters) {
    this.filtersSubject.next(filters);
    this.pageSubject.next(1); // resetear página
  }

  nextPage() {
    this.pageSubject.next(this.pageSubject.value + 1);
  }

  prevPage() {
    if (this.pageSubject.value > 1) {
      this.pageSubject.next(this.pageSubject.value - 1);
    }
  }
}
