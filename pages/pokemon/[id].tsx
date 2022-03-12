import { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Card, Grid, Text, Button, Container, Image } from '@nextui-org/react';

import confetti from 'canvas-confetti';

import { pokeApi } from '../../api';
import { Layout } from '../../components/layout';
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

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

// 01 - Se ejecuta getStaticPaths y pasa a getStaticProps
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// Se ejecuta del lado del servidor y solo en build time (compilación de la app)
// Leer argumentos de rutas de forma dinámica en páginas pre-renderizadas

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemons151 = [...Array(151)].map( ( value, index ) => `${ index + 1 }`);

    return {
        // Paths que se van a pre-generar (generar el build time)
        // Parámetro debe coincidir con el [id] llamado el archivo
        
        paths: pokemons151.map( (id) => (
          { params: { id }  }
        )),
        // paths: [
        //     { params: { id: '1' } },
        //     { params: { id: '2' } },
        //     { params: { id: '3' } }
        // ],
        fallback: false
    }
}

// 02 - Se ejecuta getStaticProps y pasa al componente
// Se ejecuta una sola vez en tiempo de build (compilación de la app), en el lado del servidor
export const getStaticProps: GetStaticProps = async (ctx) => {  
    
    const { id } = ctx.params as { id: string }; 
    return {
      props: {
        pokemon: await getPokemonInfo(id)
      }
    }
  }

export default PokemonPage;

