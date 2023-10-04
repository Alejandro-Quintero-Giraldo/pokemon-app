import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { cloneDeep, isEqual } from 'lodash';
import { Subject, distinctUntilChanged, map, takeUntil, tap } from 'rxjs';
import { selectData, selectEntities, selectPokemonsConsulted } from 'src/app/state/selector/pokemon.selector';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { Router } from '@angular/router';
import { getAllPokemons, getPokemonsByTag } from 'src/app/state/actions/pokemon.actions';
import { SmallPokemon } from '../../interfaces/small-pokemon.interface';
import { buttonAddText, buttonShowMoreText, titleMyPokemons, titlePokemonsSearch } from 'src/app/constant/app.constant';
import { addPokemon } from '../../../state/actions/pokemon.actions';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  notifier$ = new Subject();

  pokemonList: Pokemon[] = [];
  allPokemonsList: SmallPokemon[] = [];
  pokemonQueryList: Pokemon[] = [];
  showQueryPokemons = false;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllPokemons();
    this.getAllPokemonsSubscription();
    this.getPokemonsSubscription();
    this.getPokemonsByTagSubscription();
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  getAllPokemonsSubscription(): void {
    this.store.select(selectData)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual)
      ).subscribe((allPokemons) => this.allPokemonsList = cloneDeep(allPokemons))
  }

  getPokemonsByTagSubscription(): void {
    this.store.select(selectPokemonsConsulted)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual),
        tap((pokemonList: Pokemon[]) => pokemonList.length > 0)
      ).subscribe((pokemonList: Pokemon[]) => this.pokemonQueryList = cloneDeep(pokemonList))
  }

  getPokemonsSubscription(): void {
    this.store.select(selectEntities)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual),
        map((entities) => Object.values<Pokemon>(entities))
      ).subscribe((pokemons: Pokemon[]) => {
        this.pokemonList =  cloneDeep(pokemons);
        if(this.pokemonList.length === 0) {
          this.router.navigate(['/pokemon/choice'])
        }
      })
  }

  getAllPokemons(): void {
    if( this.allPokemonsList.length === 0) {
      this.store.dispatch(getAllPokemons())
    }
  }

  filterPokemonsByTag(tag: string): void {
    if( this.allPokemonsList.length === 0) return;

    if( tag.length === 0) {
      this.showQueryPokemons = false;
      return;
    }

    const pokemonListFiltered =  this.allPokemonsList.filter((pokemon) => pokemon.name.includes(tag));
    this.showQueryPokemons = true;
    this.store.dispatch(getPokemonsByTag({ pokemons: pokemonListFiltered }))
  }

  addPokemon(pokemon: Pokemon): void {
    if(this.pokemonList.includes(pokemon)) {

      return;
    }
    this.store.dispatch(addPokemon({ pokemon }))
    this.showQueryPokemons = false;
  }

  get buildPokemonList() {
    return this.showQueryPokemons ? this.pokemonQueryList : this.pokemonList
  }

  get buildTitle() {
    return this.showQueryPokemons ? titlePokemonsSearch : titleMyPokemons
  }

  get buildButtons() {
    return this.showQueryPokemons ? [buttonShowMoreText, buttonAddText] : [buttonShowMoreText];
  }

}
