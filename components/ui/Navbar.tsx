import { useTheme, Text, Spacer, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import Image from 'next/image';

export const Navbar = () => {

  const { theme } = useTheme();

  return (
    <div style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 20px',
        backgroundColor: theme?.colors.gray900.value,
    }}>
        <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="Icono de la app"
            width={70}
            height={70}
        />

        <NextLink href="/" passHref>
          <Link>
            <Text color='white' h2>P</Text>
            <Text color='white' h3>ókemon</Text>
          </Link>
        </NextLink>

        <Spacer css={{ flex: 1 }} />

        <Link href='/favorites'>
          <Text>Favoritos</Text>
        </Link>
    </div>
  )
}
