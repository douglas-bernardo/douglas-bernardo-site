import Head from 'next/head';
import Link from 'next/link';
import NextNprogress from 'nextjs-progressbar';

import { PrismicPreview } from '@prismicio/next';
import { PrismicProvider } from '@prismicio/react';
import { AppProps } from 'next/app';
import { linkResolver, repositoryName } from '../services/prismicio';
import { DefaultSeo } from 'next-seo';

import '../styles/_global.scss';

import 'highlight.js/styles/github-dark.css';

import { AppProvider } from '../context';
import { Layout } from '../components/Layout';
import { SEO } from '../../next-seo.config';

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
            <Layout>
              <NextNprogress
                color="#29D"
                startPosition={0.3}
                stopDelayMs={200}
                height={3}
                showOnShallow
              />
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
            </Layout>
          </AppProvider>
        </PrismicPreview>
      </PrismicProvider>
    </>
  );
}

export default MyApp;
