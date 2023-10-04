/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ShowPokemonComponent } from './show-pokemon.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ShowPokemonComponent', () => {
  let component: ShowPokemonComponent;
  let fixture: ComponentFixture<ShowPokemonComponent>;
  let store: MockStore;
  let activatedRoute = of({
    id: 'pichu'
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPokemonComponent ],
      providers:[
        provideMockStore({ initialState: {}}),
        { provide: ActivatedRoute, useValue: { params: activatedRoute }},
        HttpClient
      ],
      imports: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
