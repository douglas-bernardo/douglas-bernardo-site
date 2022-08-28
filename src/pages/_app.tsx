import Head from 'next/head';
import Link from 'next/link';

import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import { linkResolver, repositoryName } from '../services/prismicio';

import '../styles/_global.scss';

import 'highlight.js/styles/github-dark.css';

import { AppProvider } from '../context';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <AppProvider>
            {/* <MenuMobile />
            <Header /> */}
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* <Footer /> */}
          </AppProvider>
        </PrismicPreview>
      </PrismicProvider>
    </>
  );
}

export default MyApp;
