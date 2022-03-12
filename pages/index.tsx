import type { GetStaticProps, NextPage } from 'next';

import { Grid, Image } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../components/layout';
import PokemonCard from '../components/pokemon/PokemonCard';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokemons'>
      <Grid.Container gap={ 2 } justify='flex-start'>

      { pokemons.map((pokemon) => (
          <PokemonCard pokemon={ pokemon } key={ pokemon.id } />
        )) }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  
  data.results.map( ( pokemon ) => {
    const id = pokemon.url.split('/')[6];
    pokemon.id = +id;
    pokemon.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ id }.svg`;
  });
  
  return {
    props: {
      pokemons: data.results
    }
  }
}

export default HomePage;
