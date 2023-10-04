type PokemonStat =  {
  [key: string]: string
}


export const pokemonStatsCodes: PokemonStat = {
  hp: '#31F10F',
  attack: '#F10F12',
  defense: '#0FCFF1',
  specialattack: '#F1910F',
  specialdefense: '#0F50F1',
  speed: '#EAF10F',
  default: 'rgb(197, 197, 197)'
}

export const pokemonStatsColorCodes = (stat: string) => {
  return pokemonStatsCodes[stat]  || pokemonStatsCodes['default'];
}
