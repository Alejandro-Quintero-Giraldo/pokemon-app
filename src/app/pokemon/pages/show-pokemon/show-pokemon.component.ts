import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { cloneDeep, isEqual } from 'lodash';
import { Subject, distinctUntilChanged, map, takeUntil } from 'rxjs';
import { selectEntities, selectPokemonConsulted } from 'src/app/state/selector/pokemon.selector';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { getPokemon } from 'src/app/state/actions/pokemon.actions';
import { pokemonStatsColorCodes } from '../../dictionaries/pokemon.stat.dictionary';

@Component({
  selector: 'app-show-pokemon',
  templateUrl: './show-pokemon.component.html',
  styleUrls: ['./show-pokemon.component.css']
})
export class ShowPokemonComponent implements OnInit, OnDestroy {

  notifier$ = new Subject();

  pokemonList: Pokemon[] = [];
  pokemon: Pokemon | null = null;

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPokemonsSubscription();
    this.verifyValidRedirect();
    this.getPokemonSubscription();
  }

  getPokemonsSubscription(): void {
    this.store.select(selectEntities)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual),
        map((entities) => Object.values<Pokemon>(entities))
      ).subscribe((pokemonList) => this.pokemonList = cloneDeep(pokemonList))
  }


  getPokemonSubscription(): void {
    this.store.select(selectPokemonConsulted)
      .pipe(
        takeUntil(this.notifier$),
        distinctUntilChanged(isEqual)
      ).subscribe((pokemonConsulted: Pokemon) => this.pokemon = cloneDeep(pokemonConsulted))
  }

  verifyValidRedirect(): void {
    if( this.pokemonList.length === 0 ) {
      this.router.navigate(['/pokemon/choice'])
    }
    if(!this.pokemon) {
      this.getPokemon();
    }
  }

  getPokemon(): void {
    this.activatedRoute.params
      .pipe(
        takeUntil(this.notifier$),
        map(({ id }) => this.store.dispatch(getPokemon({ pokemonId: id })))
      ).subscribe();
  }

  buildColorInputRange(stat: string): string {
    return pokemonStatsColorCodes(stat.replace('-', ''))
  }

  ngOnDestroy(): void {
      this.notifier$.next(null);
      this.notifier$.complete();
  }

}
