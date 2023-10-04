import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { buttonAddText, buttonShowMoreText } from '../../../constant/app.constant';
import { addPokemon } from '../../../state/actions/pokemon.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent{

  @Input() pokemonList: Pokemon[] = [];

  @Input() title = '';

  @Input() buttons: string[] = [];

  @Output() addPokemonEvent = new EventEmitter<Pokemon>();

  constructor(
    private router: Router
  ) { }

  onClickButton(button: string, pokemon: Pokemon) {
    if( button === buttonAddText)
      this.addPokemon(pokemon);
    if( button === buttonShowMoreText)
      this.router.navigate(['/pokemon/', pokemon.name])
  }

  addPokemon(pokemon: Pokemon) {
    this.addPokemonEvent.emit(pokemon)
    return;
  }

}
