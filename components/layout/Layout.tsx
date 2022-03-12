import { FC } from 'react';
import Head from 'next/head'
import { Navbar } from '../ui';

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

interface Props {
  title?: string
}

export const Layout: FC<Props> = ({ children, title }) => {

  return (
    <>
        <Head>
          <title>{ title || 'Pokemon App'}</title>
          <meta name='author' content='Jorge Morgado'/>
          <meta name='description' content={`Información del pokemon ${ title }`} />
          <meta name='keywords' content={`${ title }, pokemon`}/>

          <meta property="og:title" content={`Información sobre ${ title }`} />
          <meta property="og:description" content={`Esta es la página sobre ${ title }`} />
          <meta property="og:image" content={`${ origin }/images/banner.png`} />

        </Head>

        {/* NAVBAR */}
        <Navbar />

        <main style={{ padding: '0px 20px' }}>
          { children }
        </main>
    </>
  )
}