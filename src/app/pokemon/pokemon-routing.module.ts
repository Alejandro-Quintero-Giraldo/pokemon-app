import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { ChoicePokemonComponent } from './pages/choice-pokemon/choice-pokemon.component';
import { ShowPokemonComponent } from './pages/show-pokemon/show-pokemon.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'list', component: PokemonListComponent },
      { path: 'choice', component: ChoicePokemonComponent },
      { path: ':id', component: ShowPokemonComponent },
      { path: '**', redirectTo: 'choice' },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonRoutingModule { }
