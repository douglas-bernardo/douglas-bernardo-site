import { getServerSideSitemapIndex } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { createClient, linkResolver } from '../../services/prismicio';
import * as prismicH from '@prismicio/helpers';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const client = createClient();

  const posts = await client.getAllByType('post', {
    limit: 10,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  let sitemaps: string[] = [];

  const postPaths = posts.map((post) => {
    return `${process.env.NEXT_PUBLIC_URL}${prismicH.asLink(
      post,
      linkResolver,
    )}`;
  });

  const categories = await client.getAllByType('category', {
    limit: 10,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    lang: ctx.locale,
  });

  const categoriesPaths = categories.map((post) => {
    return `${process.env.NEXT_PUBLIC_URL}${prismicH.asLink(
      post,
      linkResolver,
    )}`;
  });

  sitemaps.push(
    ...postPaths,
    ...categoriesPaths,
    `${process.env.NEXT_PUBLIC_URL}/back-end`,
    `${process.env.NEXT_PUBLIC_URL}/front-end`,
    `${process.env.NEXT_PUBLIC_URL}/mobile`,
    `${process.env.NEXT_PUBLIC_URL}/devops`,
  );

  return getServerSideSitemapIndex(ctx, sitemaps);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
