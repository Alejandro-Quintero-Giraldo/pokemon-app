import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { Pokemon } from "src/app/pokemon/interfaces/pokemon.interface";
import { SmallPokemon } from "src/app/pokemon/interfaces/small-pokemon.interface";

export const getPokemon = createAction(
  '[ChoiceComponent] getPokemon',
  props<{ pokemonId: string }>()
);

export const getPokemonSuccess = createAction(
  '[ChoiceComponent] getPokemonSuccess',
  props<{ pokemon: Pokemon }>()
);

export const getPokemonFailed = createAction(
  '[ChoiceComponent] getPokemonFailed',
  props<{ error: HttpErrorResponse }>()
);

export const addPokemon = createAction(
  '[ChoiceComponent] addPokemon',
  props<{ pokemon: Pokemon }>()
)

export const getPokemonListInit = createAction(
  '[ChoiceComponent] getPokemonListInit',
  props<{ pokemonNames: string[] }>()
)

export const getPokemonListInitSuccess = createAction(
  '[ChoiceComponent] getPokemonListInitSuccess',
  props<{ pokemonListInit: Pokemon[] }>()
);

export const getPokemonListInitFailed = createAction(
  '[ChoiceComponent] getPokemonListInitFailed',
  props<{ error: HttpErrorResponse }>()
);

export const getAllPokemons = createAction(
  '[PokemonListComponent] getAllPokemons'
);

export const getAllPokemonsSuccess = createAction(
  '[PokemonListComponent] getAllPokemonsSuccess',
  props<{ pokemonResult: SmallPokemon[] }>()
);

export const getAllPokemonsFailed = createAction(
  '[PokemonListComponent] getAllPokemonsFailed',
  props<{ error: HttpErrorResponse }>()
);


export const getPokemonsByTag = createAction(
  '[PokemonListComponent] getPokemonsByTag',
  props<{ pokemons: SmallPokemon[] }>()
);

export const getPokemonsByTagSuccess = createAction(
  '[PokemonListComponent] getPokemonsByTagSuccess',
  props<{ pokemonList: Pokemon[] }>()
);

export const getPokemonsByTagFailed = createAction(
  '[PokemonListComponent] getPokemonsByTagFailed',
  props<{ error: HttpErrorResponse }>()
);


