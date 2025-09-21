import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaces para tipar la respuesta
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  episode: string[];
}

export interface ApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharactersResponse {
  info: ApiInfo;
  results: Character[];
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene personajes con filtros y paginación
   */
  getCharacters(page: number = 1, filters: CharacterFilters = {}): Observable<CharactersResponse> {
    let params: string[] = [`page=${page}`];

    if (filters.name) params.push(`name=${filters.name}`);
    if (filters.status) params.push(`status=${filters.status}`);
    if (filters.species) params.push(`species=${filters.species}`);

    const url = `${this.baseUrl}/character?${params.join('&')}`;
    return this.http.get<CharactersResponse>(url);
  }

  /**
   * Obtiene un personaje por ID
   */
  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/character/${id}`);
  }

  /**
   * Obtiene episodios por IDs
   */
  getEpisodes(ids: number[]): Observable<any> {
    return this.http.get(`${this.baseUrl}/episode/${ids.join(',')}`);
  }
}
