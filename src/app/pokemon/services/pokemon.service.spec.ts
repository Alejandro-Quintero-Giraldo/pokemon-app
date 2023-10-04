/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cloneDeep } from 'lodash';
import { pokemonMock, resultPokemonMock, smallPokemonMock } from 'src/mocks/pokemon.mock';
import { of } from 'rxjs';
import { errorMock } from 'src/mocks/error.mock';
import { asyncError } from 'src/mocks/async-observable.helpers';


describe('PokemonService', () => {
  let service: PokemonService;
  let httpClient: HttpClient;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService, HttpClient],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(PokemonService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return a response when getPokemon is called', (done) => {
    const pokemon = cloneDeep(pokemonMock);

    spyOn(httpClient, 'get').and.returnValue(of(pokemon));

    service.getPokemon('pichu').subscribe((res) => {
      expect(res).toEqual(pokemonMock);
      done();
    }, done.fail)

    expect(service).toBeTruthy();
  });

  it('should return an error when getPokemon is called', (done) => {
    const response = errorMock;

    spyOn(httpClient, 'get').and.returnValue(asyncError(response));

    service.getPokemon('').subscribe(
      () => done.fail('An error was expected'),
      (error) => {
        expect(error.message).toContain('notFound'), done();
      }
    );
  });

  it('should return a response when getAllPokemon is called', (done) => {
    const pokemon = cloneDeep(resultPokemonMock);

    spyOn(httpClient, 'get').and.returnValue(of(pokemon));

    service.getAllPokemons().subscribe((res) => {
      expect(res).toEqual([smallPokemonMock]);
      done();
    }, done.fail)

    expect(service).toBeTruthy();
  });

  it('should return an error when getAllPokemon is called', (done) => {
    const response = errorMock;

    spyOn(httpClient, 'get').and.returnValue(asyncError(response));

    service.getPokemon('').subscribe(
      () => done.fail('An error was expected'),
      (error) => {
        expect(error.message).toContain('notFound'), done();
      }
    );
  });

  it('should return a response when getPokemonByUrl is called', (done) => {
    const pokemon = cloneDeep(pokemonMock);

    spyOn(httpClient, 'get').and.returnValue(of(pokemon));

    service.getPokemonByUrl('pichu').subscribe((res) => {
      expect(res).toEqual(pokemonMock);
      done();
    }, done.fail)

    expect(service).toBeTruthy();
  });

  it('should return an error when getPokemonByUrl is called', (done) => {
    const response = errorMock;

    spyOn(httpClient, 'get').and.returnValue(asyncError(response));

    service.getPokemon('').subscribe(
      () => done.fail('An error was expected'),
      (error) => {
        expect(error.message).toContain('notFound'), done();
      }
    );
  });
});

