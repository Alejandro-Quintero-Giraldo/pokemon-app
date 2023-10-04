import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, forkJoin, map, of, switchMap, tap } from "rxjs";
import { PokemonService } from "src/app/pokemon/services/pokemon.service";
import { getAllPokemons, getAllPokemonsFailed, getAllPokemonsSuccess, getPokemon, getPokemonFailed, getPokemonListInit, getPokemonListInitFailed, getPokemonListInitSuccess, getPokemonSuccess, getPokemonsByTag, getPokemonsByTagFailed, getPokemonsByTagSuccess } from '../actions/pokemon.actions';
import { Pokemon } from "src/app/pokemon/interfaces/pokemon.interface";

@Injectable()
export class PokemonEffects {

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService
  ){}

    getPokemonEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(getPokemon),
        switchMap((action) =>
          this.pokemonService.getPokemon(action.pokemonId)
            .pipe(
              map((pokemon) => getPokemonSuccess({ pokemon })),
              catchError((error) => of(getPokemonFailed({ error })))

            )
        ));
    });

    getPokemonListInitEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(getPokemonListInit),
        tap((action) => action.pokemonNames.length === 3),
        switchMap((action) =>
          forkJoin(
            action.pokemonNames.map((pokemonName) => this.pokemonService.getPokemon(pokemonName))
          )
          .pipe(
            switchMap((pokemonListInit: Pokemon[]) => [
              getPokemonListInitSuccess({ pokemonListInit })
            ]),
            catchError((error) => of(getPokemonListInitFailed({ error })))
          )
        ));
    });

    getAllPokemonsEffect$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(getAllPokemons),
        switchMap(() =>
          this.pokemonService.getAllPokemons()
            .pipe(
              map((pokemons) => getAllPokemonsSuccess({ pokemonResult: pokemons })),
              catchError((error) => of(getAllPokemonsFailed({ error })))
            )
        ));
    });


    getPokemonsByTagEffect$ =  createEffect(() => {
      return this.actions$.pipe(
        ofType(getPokemonsByTag),
        switchMap((action) =>
          forkJoin(
            action.pokemons.map((pokemon) => this.pokemonService.getPokemonByUrl(pokemon.url))
          )
          .pipe(
            switchMap((pokemonList: Pokemon[]) => [
              getPokemonsByTagSuccess({ pokemonList })
            ]),
            catchError((error) => of(getPokemonsByTagFailed({ error })))
          )
        ));
    });
}
