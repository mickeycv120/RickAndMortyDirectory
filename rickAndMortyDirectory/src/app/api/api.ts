import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Character, CharacterFilters, CharactersResponse } from '../Types/characterType';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private baseUrl = environment.baseUrl;
  private favoritesKey = 'rick-morty-favorites';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene personajes con filtros y paginación
   */
  getCharacters(page: number = 1, filters: CharacterFilters = {}): Observable<CharactersResponse> {
    let params: string[] = [`page=${page}`];

    // Si solo queremos favoritos, los obtenemos desde localStorage
    if (filters.showFavorites) {
      return this.getFavoriteCharacters(page);
    }

    if (filters.name) params.push(`name=${filters.name}`);
    if (filters.status) params.push(`status=${filters.status}`);
    if (filters.species) params.push(`species=${filters.species}`);

    const url = `${this.baseUrl}/character?${params.join('&')}`;
    return this.http.get<CharactersResponse>(url).pipe(
      map((response) => ({
        ...response,
        results: response.results.map((character) => ({
          ...character,
          isFavorite: this.isCharacterFavorite(character.id),
        })),
      }))
    );
  }

  /**
   * Obtiene un personaje por ID
   */
  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`).pipe(
      map((character) => ({
        ...character,
        isFavorite: this.isCharacterFavorite(character.id),
      }))
    );
  }

  /**
   * Obtiene episodios por IDs
   */
  getEpisodes(ids: number[]): Observable<any> {
    return this.http.get(`${this.baseUrl}/episode/${ids.join(',')}`);
  }

  /**
   * Añade o quita un personaje de favoritos
   */
  toggleFavorite(character: Character): void {
    const favorites = this.getFavorites();
    const index = favorites.findIndex((fav) => fav.id === character.id);

    if (index >= 0) {
      // Quitar de favoritos
      favorites.splice(index, 1);
    } else {
      // Añadir a favoritos
      favorites.push({ ...character, isFavorite: true });
    }

    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  /**
   * Verifica si un personaje es favorito
   */
  isCharacterFavorite(characterId: number): boolean {
    const favorites = this.getFavorites();
    return favorites.some((fav) => fav.id === characterId);
  }

  /**
   * Obtiene todos los favoritos desde localStorage
   */
  getFavorites(): Character[] {
    const favorites = localStorage.getItem(this.favoritesKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  /**
   * Obtiene personajes favoritos con paginación simulada
   */
  private getFavoriteCharacters(page: number = 1): Observable<CharactersResponse> {
    const favorites = this.getFavorites();
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFavorites = favorites.slice(startIndex, endIndex);

    // Simular estructura de respuesta de la API
    const response: CharactersResponse = {
      info: {
        count: favorites.length,
        pages: Math.ceil(favorites.length / pageSize),
        next: endIndex < favorites.length ? `mock-next-page-${page + 1}` : null,
        prev: page > 1 ? `mock-prev-page-${page - 1}` : null,
      },
      results: paginatedFavorites,
    };

    return of(response);
  }
}
