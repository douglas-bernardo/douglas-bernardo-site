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
import 'flag-icons/css/flag-icons.css';

import { AppProvider } from '../context';
import { SEO } from '../../next-seo.config';

function NextLinkShim({ href, children, locale, ...props }) {
  return (
    <Link href={href} locale={locale}>
      <a {...props}>{children}</a>
    </Link>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={NextLinkShim}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <AppProvider>
            <NextNprogress
              color="#29D"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow
            />
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </AppProvider>
        </PrismicPreview>
      </PrismicProvider>
    </>
  );
}

export default MyApp;
