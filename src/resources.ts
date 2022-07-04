export interface PokemonAPIResponse {
    count: number;
    next: string;
    results: PokemonListItem[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}