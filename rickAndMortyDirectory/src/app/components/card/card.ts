import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Character, CharacterFilters, CharactersResponse } from '../../Types/characterType';
import { RickMortyService } from '../../api/api';
import { BehaviorSubject, Observable, switchMap, map, startWith, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card implements OnInit {
  @Input() filters$!: Observable<CharacterFilters>;
  @Output() dataChange = new EventEmitter<{ totalCount: number }>();
  @Output() characterClick = new EventEmitter<Character>();

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
              tap((data) => {
                // Emitir el totalCount al componente padre
                this.dataChange.emit({ totalCount: data.totalCount });
              }),
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

  ngOnInit() {
    // Suscribirse a los cambios de filtros desde el Input
    if (this.filters$) {
      this.filters$.subscribe((filters) => {
        this.filtersSubject.next(filters);
        this.pageSubject.next(1); // Reset to first page when filters change
      });
    }
  }

  trackByCharacter(index: number, character: Character): number {
    return character.id;
  }

  onCharacterClick(character: Character) {
    this.characterClick.emit(character);
  }

  onFavoriteClick(character: Character, event: Event) {
    // Prevenir que se abra el modal al hacer click en favorito
    event.stopPropagation();

    // Toggle del estado de favorito
    character.isFavorite = !character.isFavorite;
    this.rickMortyService.toggleFavorite(character);

    // Recargar datos para reflejar los cambios si estamos mostrando favoritos
    const currentFilters = this.filtersSubject.getValue();
    if (currentFilters.showFavorites) {
      this.filtersSubject.next({ ...currentFilters });
    }
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
