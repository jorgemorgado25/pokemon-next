import { useState, useEffect } from 'react';

import { Layout } from "../../components/layout"
import { localFavorites } from '../../utils';
import { NoFavorites } from "../../components/ui";
import { FavoritePokemons } from '../../components/pokemon/';

const Index = () => {

  const [ pokemons, setPokemons ] = useState<number[]>([]);

  useEffect(() => {
    setPokemons(localFavorites.pokemons());
  }, [])
  
  return (
    <Layout title='Favoritos'>
      { pokemons.length === 0
        ? (<NoFavorites />)
        : ( <FavoritePokemons pokemons={ pokemons } /> )
      }
    </Layout>
  )
}

export default Index;