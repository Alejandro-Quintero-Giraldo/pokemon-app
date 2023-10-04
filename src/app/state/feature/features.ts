import { StoreModule } from "@ngrx/store";
import { pokemonFeature } from "./pokemon.feature";

export const stateFeature = [
  StoreModule.forFeature(pokemonFeature)
];
