import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';
import { createClient } from '../services/prismicio';

import { Page as SEOPageComponent } from '../components/Page';
import { HorizontalCard } from '../components/HorizontalCard';

import { capitalize } from '../helpers/utils';
import { Post, Settings } from '../@types/types';

import styles from './../styles/page.module.scss';
import { PageDocument } from '../../.slicemachine/prismicio';

type PageProps = {
  page: PageDocument<string>;
  posts: Post[];
  slug: string;
  settings: Settings;
  categoryName: string;
};

export default function Page({ page, posts, slug, settings }: PageProps) {
  return (
    <SEOPageComponent
      settings={settings}
      title={prismicH.asText(page.data.title)}
      path={`/${slug}`}
    >
      <section className={styles.container}>
        {posts.length > 0 ? (
          <div className={styles.header}>
            <h1 className="text">{prismicH.asText(page.data.title)}</h1>
            <span>{`${posts.length} ${
              posts.length > 1 ? 'Posts' : 'Post'
            }`}</span>
          </div>
        ) : (
          <h1>Under Construction...</h1>
        )}

        {posts.length > 0 ? (
          posts.map((post) => <HorizontalCard key={post.uid} post={post} />)
        ) : (
          <img src="/images/working-from-home.svg" alt="under construction" />
        )}
      </section>
    </SEOPageComponent>
  );
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  previewData,
  params,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const page = await client.getByUID('page', String(uid), { lang: locale });
  const relatedTags = page.data.tags
    .split(',')
    .map((element) => element.trim());

  const posts = await client.getAllByType('post', {
    limit: 10,
    predicates: [prismic.predicate.any('document.tags', relatedTags)],
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  const settings = await client.getSingle('settings');

  return {
    props: {
      page,
      posts,
      slug: uid,
      settings,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
