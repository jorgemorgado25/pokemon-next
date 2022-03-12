import { Container, Text } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'

export const NoFavorites = () => {
  return (
    <Container css={{
        display:'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      }}
      >
        <Text h1>No hay favoritos</Text>
        <Image
          src="/images/113.svg"
          width={250}
          height={250}
          alt="Pokemon"
        />
      </Container>
  )
}