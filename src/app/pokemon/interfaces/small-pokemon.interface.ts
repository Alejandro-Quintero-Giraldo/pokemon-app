export interface SmallPokemon {
  name: string;
  url: string
}


export interface ResultPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: SmallPokemon[];
}
