import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';

import * as prismic from '@prismicio/client';

import { createClient } from '../../services/prismicio';

import styles from './../../styles/page.module.scss';

import { Post, Settings } from '../../@types/types';
import { HorizontalCard } from '../../components/HorizontalCard';
import { Page } from '../../components/Page';

type Props = {
  posts: Post[];
  settings: Settings;
  category_name: string;
};

export default function Category({ posts, settings, category_name }: Props) {
  return (
    <Page settings={settings} title={category_name}>
      <section className={styles.container}>
        {posts.length > 0 ? (
          <div className={styles.header}>
            <h1 className="text">{category_name.toUpperCase()}</h1>
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
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const settings = await client.getSingle('settings');

  const selectedCategory = await client.getByUID('category', String(uid));

  const posts = await client.getAllByType('post', {
    limit: 10,
    predicates: [prismic.predicate.at('my.post.category', selectedCategory.id)],
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return {
    props: {
      settings,
      posts,
      category_name: prismicH.asText(selectedCategory.data.category_name),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
