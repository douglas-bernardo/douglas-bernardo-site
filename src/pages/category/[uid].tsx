import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';

import { createClient } from '../../services/prismicio';

import { CategoryDocument, SettingsDocument } from '../../../prismicio-types';

import { Post, Settings } from '../../@types/types';
import { HorizontalCard } from '../../components/HorizontalCard';
import { Page } from '../../components/Page';

import styles from './../../styles/page.module.scss';

type Props = {
  posts: Post[];
  settings: SettingsDocument<string>;
  category: CategoryDocument<string>;
};

export default function Category({ posts, settings, category }: Props) {
  return (
    <Page
      settings={settings}
      title={prismicH.asText(category.data.category_name)}
      alternateLanguages={category.alternate_languages}
    >
      <section className={styles.container}>
        {posts.length > 0 ? (
          <div className={styles.header}>
            <h1 className="text">
              {prismicH.asText(category.data.category_name)}
            </h1>
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
  locale,
  previewData,
  params,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const settings = await client.getSingle('settings', { lang: locale });

  const selectedCategory = await client.getByUID('category', String(uid), {
    lang: locale,
  });

  const posts = await client.getAllByType('post', {
    limit: 10,
    lang: locale,
    predicates: [prismic.predicate.at('my.post.category', selectedCategory.id)],
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return {
    props: {
      settings,
      category: selectedCategory,
      posts,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
