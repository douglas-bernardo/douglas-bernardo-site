import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';
import { createClient } from '../services/prismicio';

import { Page as SEOPageComponent } from '../components/Page';
import { HorizontalCard } from '../components/HorizontalCard';

import { capitalize } from '../helpers/utils';
import { Post, Settings } from '../@types/types';

import styles from './../styles/page.module.scss';

type PageProps = {
  posts: Post[];
  slug: string;
  settings: Settings;
  categoryName: string;
};

export default function Page({
  posts,
  slug,
  settings,
  categoryName,
}: PageProps) {
  return (
    <SEOPageComponent
      settings={settings}
      title={capitalize(String(slug))}
      path={`/${slug}`}
    >
      <section className={styles.container}>
        {posts.length > 0 ? (
          <div>
            <h1 className="text">{categoryName}</h1>
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
  previewData,
  params,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const selectedCategory = await client.getByUID('category', String(uid));
  const categoryName = prismicH.asText(selectedCategory.data.category_name);

  const posts = await client.getAllByType('post', {
    limit: 10,
    predicates: [prismic.predicate.at('document.tags', [categoryName])],
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  const settings = await client.getSingle('settings');

  return {
    props: {
      posts,
      slug: uid,
      categoryName,
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
