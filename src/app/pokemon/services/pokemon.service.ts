import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { baseUrl } from 'src/environments/environment';
import { Pokemon } from '../interfaces/pokemon.interface';
import { ResultPokemon, SmallPokemon } from '../interfaces/small-pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {


constructor(private http: HttpClient) {}


  getPokemon(pokemonName: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${ baseUrl }/${ pokemonName }`)
  }

  getAllPokemons(): Observable<SmallPokemon[]> {
    const url = `${ baseUrl }?limit=1000`
    return this.http.get<ResultPokemon>(url)
      .pipe(
        map((queryResult: ResultPokemon) => queryResult.results)
      );
  }

  getPokemonByUrl(url: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(url);
  }


}
