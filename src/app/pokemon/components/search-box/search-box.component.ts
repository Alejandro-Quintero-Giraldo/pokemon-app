import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'pokemon-search-box',
  template: `
    <h5>Search: </h5>
    <input type="text"
      class="form-control"
      placeholder="Search new pokemons"
      (blur)="searchTag()"
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `
})
export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>

  @Output()
  searchPokemons = new EventEmitter<string>();


  constructor() { }


  searchTag(){

    const newTag = this.tagInput.nativeElement.value

    this.searchPokemons.emit(newTag);
  }

}
