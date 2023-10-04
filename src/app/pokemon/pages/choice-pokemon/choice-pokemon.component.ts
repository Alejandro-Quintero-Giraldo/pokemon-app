import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { Store } from '@ngrx/store';
import { pokemonChoiceList } from 'src/app/constant/app.constant';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { addPokemon, getPokemonListInit } from 'src/app/state/actions/pokemon.actions';
import { selectEntities, selectPokemonListInit } from 'src/app/state/selector/pokemon.selector';
import { cloneDeep, isEqual } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choice-pokemon',
  templateUrl: './choice-pokemon.component.html',
  styleUrls: ['./choice-pokemon.component.css']
})
export class ChoicePokemonComponent implements OnInit, OnDestroy {

  notifier$ = new Subject();

  pokemonNameChoiceList: string[]  = pokemonChoiceList;
  pokemonChoiceList: Pokemon[] = [];


  constructor(
    private store: Store,
    private router: Router
    ) { }


  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  ngOnInit() {
    this.getPokemonChoiceList();
    this.getPokemonListInitSubscription();
    this.getPokemonsSubscription();
  }

  getPokemonChoiceList(): void {
    if( this.pokemonChoiceList.length === 0 ) {
      this.store.dispatch(getPokemonListInit({ pokemonNames: this.pokemonNameChoiceList}))

    }
  }

  getPokemonListInitSubscription(): void {
    this.store.select(selectPokemonListInit)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual)
      ).subscribe((value: Pokemon[]) => this.pokemonChoiceList = cloneDeep(value) )
  }

  getPokemonsSubscription(): void {
    this.store.select(selectEntities)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual),
        map((entities) => Object.values<Pokemon>(entities))
      ).subscribe((pokemons: Pokemon[]) => pokemons.length > 0
        ? this.router.navigate(['/pokemon/list'])
        : null)
  }

  choicePokemon(name: string) {
    this.store.dispatch(addPokemon({
      pokemon: this.pokemonChoiceList.find((pokemon) =>
        isEqual(pokemon.name, name))  || {} as Pokemon
      }));
    this.router.navigate(['/pokemon/list'])
  }

}
