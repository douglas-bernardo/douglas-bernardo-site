import { parseISO } from 'date-fns';
import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { createClient, linkResolver } from '../../services/prismicio';
import * as prismicH from '@prismicio/helpers';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = createClient();

  const posts = await client.getAllByType('post', {
    limit: 10,
    lang: ctx.locale,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  let sitemaps: {
    loc: string;
    lastmod: string;
  }[] = [];

  const postFields = posts.map((post) => {
    return {
      loc: `${process.env.NEXT_PUBLIC_URL}${prismicH.asLink(
        post,
        linkResolver,
      )}`,
      lastmod: parseISO(post.last_publication_date).toISOString(),
    };
  });

  const categories = await client.getAllByType('category', {
    limit: 10,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    lang: ctx.locale,
  });

  const categoriesFields = categories.map((category) => {
    return {
      loc: `${process.env.NEXT_PUBLIC_URL}${prismicH.asLink(
        category,
        linkResolver,
      )}`,
      lastmod: new Date().toISOString(),
    };
  });

  sitemaps.push(
    ...postFields,
    ...categoriesFields,
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/back-end`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/front-end`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/mobile`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL}/devops`,
      lastmod: new Date().toISOString(),
    },
  );

  return getServerSideSitemap(ctx, sitemaps);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
