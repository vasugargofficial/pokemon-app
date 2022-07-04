import React from 'react';
import './App.css';
import {RootStore} from "./store/rootStore";
import Header from "./components/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import {observer} from "mobx-react";
import {Col, Row} from "react-bootstrap";

export interface IAppProps {
    store: RootStore;
}

const colors: any = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const mainTypes = Object.keys(colors);

const App = observer((props: IAppProps) => {
    const {store} = props;

    const getBackgroundDetails = (pokemon: any) => {
        const pokeTypes = pokemon?.types?.map((type: any) => type.type.name);
        const type = mainTypes.find(type => pokeTypes?.includes(type));
        return {color: type ? colors[type] : null, type: type || ''};
    }

    return (
        <div className={'App-container'}>
            <div className='layout'>
                <Header {...props}/>
                <div className={'content-main p-4'}>
                    <div className='poke-container p-5'>
                        <InfiniteScroll
                            next={store.setPokemonDataList}
                            style={{overflowX: 'hidden'}}
                            hasMore={true}
                            loader={''}
                            dataLength={store.pokemonList.length}
                        >
                            <Row>
                                {store.pokemonList.map((pokemon, index) => {
                                    const details = store?.pokemonDetailsList[pokemon.name];
                                    const {color, type} = getBackgroundDetails(details);

                                    return <Col md={"auto"} key={pokemon.name}>
                                        <div style={{backgroundColor: color}} className={'pokemon'}>
                                                <div className={'img-container'}>
                                                    <img
                                                        src={details?.sprites?.other?.dream_world?.front_default}
                                                        alt={''}
                                                    />
                                                </div>
                                                <div className={'mt-2'}>
                                            <span className={'number'}>
                                                {`#${index + 1}`}
                                            </span>
                                                    <div className={'name'}>
                                                        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                                                    </div>
                                                    <div className={'fw-bold'}>
                                                        {type}
                                                    </div>
                                                </div>
                                            </div>
                                    </Col>
                                })}
                                {!store.isLoading && !store.pokemonList.length && <h5>
                                    No Pokemon found
                                </h5>}
                            </Row>
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </div>
    );
})

export default App;