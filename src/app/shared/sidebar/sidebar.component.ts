import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { selectEntities } from 'src/app/state/selector/pokemon.selector';
import { cloneDeep, isEqual } from 'lodash';
import { Pokemon } from 'src/app/pokemon/interfaces/pokemon.interface';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  notifier$ = new Subject();

  pokemonList: Pokemon[] = [];


  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.getPokemonsSubscription();
  }


  getPokemonsSubscription(): void {
    this.store.select(selectEntities)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual),
        map((entities) => Object.values<Pokemon>(entities))
      ).subscribe((pokemons: Pokemon[]) =>
        this.organizePokemonOptions(cloneDeep(pokemons))
      )
  }

  organizePokemonOptions(pokemons: Pokemon[]): void {
    this.pokemonList = pokemons.splice(0,10);
  }

  ngOnDestroy(): void {
      this.notifier$.next(null);
      this.notifier$.complete();
  }

}
