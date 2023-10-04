import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { ChoicePokemonComponent } from './pages/choice-pokemon/choice-pokemon.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { SharedModule } from '../shared/shared.module';
import { ShowPokemonComponent } from './pages/show-pokemon/show-pokemon.component';


@NgModule({
  imports: [
    CommonModule,
    PokemonRoutingModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    PokemonListComponent,
    ChoicePokemonComponent,
    SearchBoxComponent,
    PokemonCardComponent,
    ShowPokemonComponent
  ]
})
export class PokemonModule { }
