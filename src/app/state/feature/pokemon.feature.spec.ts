import { PokemonState, pokemonFeature } from "./pokemon.feature"
import * as actions from '../actions/pokemon.actions';
import { cloneDeep } from "lodash";
import { pokemonMock, smallPokemonMock } from "src/mocks/pokemon.mock";
import { errorMock } from "src/mocks/error.mock";

describe('PokemonFeature', () => {

  const initialState: PokemonState = {
    data: [],
    pokemonListInit: [],
    pokemonsConsulted: [],
    pokemonConsulted: null,
    ids: [],
    entities: {},
    loading: false,
    error: null
  }

  it('should add a pokemon when the addPokemon is called', () => {
    const action = actions.addPokemon({ pokemon: cloneDeep(pokemonMock) });

    const state = pokemonFeature.reducer(initialState, action);

    expect(Object.values(state.entities).length).toBeGreaterThan(0);
  });

  it('should get a pokemon when the getPokemon is called', () => {
    const action = actions.getPokemon({ pokemonId: '92'});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.loading).toBeTrue();
  });

  it('should get a pokemon when the getPokemonSuccess is called', () => {
    const action = actions.getPokemonSuccess({ pokemon: cloneDeep(pokemonMock)});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.pokemonConsulted).toEqual(pokemonMock);
  });

  it('should get a pokemon when the getPokemonFailed is called', () => {
    const action = actions.getPokemonFailed({ error: cloneDeep(errorMock)});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.error).toEqual(errorMock);
  });

  it('should get a pokemon when the getAllPokemons is called', () => {
    const action = actions.getAllPokemons();

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.loading).toBeTrue();
  });

  it('should get a pokemon when the getAllPokemonsSuccess is called', () => {
    const action = actions.getAllPokemonsSuccess({ pokemonResult: [smallPokemonMock]});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.data).toEqual([smallPokemonMock]);
  });

  it('should get a pokemon when the getAllPokemonsFailed is called', () => {
    const action = actions.getAllPokemonsFailed({ error: cloneDeep(errorMock)});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.error).toEqual(errorMock);
  });

  it('should get a pokemon when the getPokemonListInit is called', () => {
    const action = actions.getPokemonListInit({ pokemonNames: ['pichu'] });

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.loading).toBeTrue();
  });

  it('should get a pokemon when the getPokemonListInitSuccess is called', () => {
    const action = actions.getPokemonListInitSuccess({ pokemonListInit: [pokemonMock]});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.pokemonListInit).toEqual([pokemonMock]);
  });

  it('should get a pokemon when the getPokemonListInitFailed is called', () => {
    const action = actions.getPokemonListInitFailed({ error: cloneDeep(errorMock)});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.error).toEqual(errorMock);
  });

  it('should get a pokemon when the getPokemonByTag is called', () => {
    const action = actions.getPokemonsByTag({ pokemons: [smallPokemonMock] });

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.loading).toBeTrue();
  });

  it('should get a pokemon when the getPokemonByTagSuccess is called', () => {
    const action = actions.getPokemonsByTagSuccess({ pokemonList: [pokemonMock]});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.pokemonsConsulted).toEqual([pokemonMock]);
  });

  it('should get a pokemon when the getPokemonByTagFailed is called', () => {
    const action = actions.getPokemonsByTagFailed({ error: cloneDeep(errorMock)});

    const state = pokemonFeature.reducer(initialState, action);

    expect(state.error).toEqual(errorMock);
  });

})
