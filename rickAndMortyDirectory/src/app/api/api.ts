import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character, CharacterFilters, CharactersResponse } from '../Types/characterType';

@Injectable({
  providedIn: 'root',
})
export class RickMortyService {
  private baseUrl = environment.baseUrl;

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
