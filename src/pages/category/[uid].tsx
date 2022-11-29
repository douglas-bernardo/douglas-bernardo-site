import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';

import * as prismic from '@prismicio/client';

import { createClient } from '../../services/prismicio';

import styles from './../../styles/page.module.scss';

import { Post } from '../../@types/types';
import { HorizontalCard } from '../../components/HorizontalCard';
import { Page } from '../../components/Page';

type Props = {
  posts: Post[];
  category_name: string;
};

export default function Category({ posts, category_name }: Props) {
  return (
    <Page title={category_name}>
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
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async ({
  previewData,
  params,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

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
