import { Pokemon } from "src/app/pokemon/interfaces/pokemon.interface";
import { createFeature, createReducer, on } from '@ngrx/store'
import { addPokemon, getAllPokemons, getAllPokemonsFailed, getAllPokemonsSuccess, getPokemon, getPokemonFailed, getPokemonListInit, getPokemonListInitFailed, getPokemonListInitSuccess, getPokemonSuccess, getPokemonsByTag, getPokemonsByTagFailed, getPokemonsByTagSuccess } from "../actions/pokemon.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { SmallPokemon } from "src/app/pokemon/interfaces/small-pokemon.interface";
import { HttpErrorResponse } from "@angular/common/http";

export interface  PokemonState extends EntityState<Pokemon> {
  loading: boolean;
  error: HttpErrorResponse | null;
  data: SmallPokemon[];
  pokemonListInit: Pokemon[];
  pokemonsConsulted: Pokemon[];
  pokemonConsulted: Pokemon | null;
}

export const selectPokemonId = (pokemon: Pokemon): number => pokemon.id;

const pokemonAdapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>({
  selectId: selectPokemonId
})


export const initialState: PokemonState = pokemonAdapter.getInitialState({
  loading: false,
  error: null,
  data: [],
  pokemonListInit: [],
  pokemonsConsulted: [],
  pokemonConsulted: null
})

export const pokemonFeature = createFeature({
  name: 'pokemonFeature',
  reducer: createReducer(
    initialState,
    on(getPokemon, (state) => ({
      ...state,
      loading: true
    })),
    on(getPokemonSuccess, (state, newState) => ({
      ...state,
      loading: false,
      pokemonConsulted: newState.pokemon
    })),
    on(getPokemonFailed, (state, newState) => ({
      ...state,
      loading: false,
      error: newState.error
    })),
    on(addPokemon, (state, newState) =>
      pokemonAdapter.addOne(newState.pokemon, state)
    ),
    on(getPokemonListInit, (state) => ({
      ...state,
      loading: true
    })),
    on(getPokemonListInitSuccess, (state, newState) => ({
      ...state,
      pokemonListInit: newState.pokemonListInit
    })),
    on(getPokemonListInitFailed, (state, newState) => ({
      ...state,
      loading: false,
      error: newState.error
    })),
    on(getAllPokemons, (state) => ({
      ...state,
      loading: true
    })),
    on(getAllPokemonsSuccess, (state, newState) => ({
      ...state,
      loading: false,
      data: newState.pokemonResult
    })),
    on(getAllPokemonsFailed, (state, newState) => ({
      ...state,
      loading: false,
      error: newState.error
    })),
    on(getPokemonsByTag, (state) => ({
      ...state,
      loading: true
    })),
    on(getPokemonsByTagSuccess, (state, newState) => ({
      ...state,
      loading: false,
      pokemonsConsulted: newState.pokemonList
    })),
    on(getPokemonsByTagFailed, (state, newState) => ({
      ...state,
      loading: false,
      error: newState.error
    })),
  )
})

export const { name, reducer } = pokemonFeature;
