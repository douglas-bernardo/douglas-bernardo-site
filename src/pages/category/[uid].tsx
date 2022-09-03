import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';

import Head from 'next/head';
import * as prismic from '@prismicio/client';

import { createClient } from '../../services/prismicio';

import styles from './../../styles/page.module.scss';
import { capitalize } from '../../helpers/utils';
import { Category, Post } from '../../@types/types';
import { HorizontalCard } from '../../components/HorizontalCard';

type Props = {
  posts: Post[];
  category_name: string;
};

export default function Tutorials({ posts, category_name }: Props) {
  return (
    <>
      <Head>
        <title>{`${category_name} | Beancodes`}</title>
      </Head>

      <section className={styles.container}>
        <h3 className="text">
          {posts.length > 0
            ? category_name.toUpperCase()
            : 'Under Construction...'}
        </h3>
        {posts.length > 0 ? (
          posts.map((post) => <HorizontalCard key={post.uid} post={post} />)
        ) : (
          <img src="/images/working-from-home.svg" alt="under construction" />
        )}
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const category = await client.getByUID('category', String(uid));

  const posts = await client.getAllByType('post', {
    limit: 10,
    predicates: [prismic.predicate.at('my.post.category', category.id)],
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return {
    props: {
      posts,
      category_name: prismicH.asText(category.data.category_name),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
