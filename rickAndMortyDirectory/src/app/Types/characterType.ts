import { ApiInfo } from '../Types/apiTypes';

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

export interface CharactersResponse {
  info: ApiInfo;
  results: Character[];
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
}
