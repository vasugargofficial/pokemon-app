import {makeAutoObservable} from "mobx";
import {PokemonListItem} from "../resources";
import _ from "lodash";
import {ApiClient} from "../apiClient";

export class RootStore {
    next = `https://pokeapi.co/api/v2/pokemon?limit=25&offset=0`;
    pokemonList: PokemonListItem[] = [];
    allPokemonData: PokemonListItem[] = [];
    pokemonDetailsList: any = {};
    search: string = '';
    apiClient = new ApiClient();

    constructor() {
        makeAutoObservable(this);
        this.setPokemonDataList();
    }

    setSearch = (e: any) => {
        this.search = e.target.value;
    }

    setPokemonDataList = async () => {
        try {
            const data = await this.apiClient.get(this.next);
            data.results.forEach(async (pokemon: any) => {
                this.pokemonDetailsList[pokemon.name] = await this.getPokemonDetail(pokemon.url);
            });
            this.allPokemonData = [...this.pokemonList, ...data.results];
            this.pokemonList = _.cloneDeep(this.allPokemonData);
            this.filterResults();
            this.next = data.next;
        } catch (e) {

        }
    }

    getPokemonDetail = async (url: string) => {
        try {
            return await this.apiClient.get(url);
        } catch (e) {
            return {}
        }
    }

    filterResults = () => {
        this.pokemonList = this.allPokemonData.filter(pokemon => pokemon.name.includes(this.search));
    }
}