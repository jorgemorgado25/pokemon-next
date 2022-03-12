import { useEffect, useState } from 'react';

import confetti from 'canvas-confetti';

import { Card, Button, Container, Grid, Text, Image } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { pokeApi } from '../../api'
import { Layout } from '../../components/layout'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon
}

const PokemonByName: NextPage<Props> = ({ pokemon }) => {

    const [ isInFavorites, setIsInFavorites ] = useState<boolean>( false );

  const onToogleFavorite = () => {
    localFavorites.toogleFavorite( pokemon.id );
    setIsInFavorites(!isInFavorites);
    if (isInFavorites) return;
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  useEffect( () => {
    setIsInFavorites(localFavorites.inFavorites(pokemon.id));
  }, []);

  return (
    <Layout title={ pokemon.name }>
        <h1>{ pokemon.name }</h1>
        <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
          <Grid xs={ 12 } sm={ 4 }>
            <Card hoverable css={{ padding: '30px' }}>
              <Card.Body>
                <Card.Image
                  src={ pokemon.sprites.other?.dream_world.front_default || 'no-image' }
                  alt={ pokemon.name }
                  width="100%"
                  height={ 200 }
                />
              </Card.Body>
            </Card>
          </Grid>

          <Grid xs={ 12 } sm={ 8 }>
            <Card>
              <Card.Header  css={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text h1 >{ pokemon.name }</Text>

                <Button
                  color="gradient"
                  onClick={ onToogleFavorite }
                  ghost={ !isInFavorites }
                >
                  { isInFavorites ? 'En favoritos' : 'Agregar a favoritos' }
                </Button>
                
              </Card.Header>

              <Card.Body>
                <Text size={ 30 }>Sprites: </Text>
                <Container display='flex' direction='row' >
                  <Image
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.front_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_default }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                  <Image
                    src={ pokemon.sprites.back_shiny }
                    alt={ pokemon.name }
                    width={ 100 }
                    height={ 100 }
                  />
                </Container>
              </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    </Layout>
  )
}

interface Props {
    pokemon: Pokemon
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const { data } = await pokeApi.get<PokemonListResponse>('pokemon?limit=151');
    const pokemons: string[] = data.results.map( pokemon => pokemon.name);

    return {
        paths: pokemons.map( (name) => (
            { params: { name }  }
        )),
        fallback: false
    }
  }
export const getStaticProps: GetStaticProps = async (ctx) => {  
    
    const { name } = ctx.params as { name: string };

    return {
      props: {
        pokemon: await getPokemonInfo(name)
      }
    }
  }

export default PokemonByName;