import { GetStaticProps } from 'next';
import { PrismicText } from '@prismicio/react';
import * as prismicH from '@prismicio/helpers';

import Link from 'next/link';
import { CategoryProps, Post, Settings } from '../@types/types';

import { Greeting } from '../components/Greeting';
import { HorizontalCard } from '../components/HorizontalCard';
import { LinkButton } from '../components/LinkButton';
import { Page } from '../components/Page';

import { createClient } from '../services/prismicio';
import { filterTextSlice } from '../helpers/utils';
import { PageDocument } from '../../.slicemachine/prismicio';

import styles from './../styles/home.module.scss';

type Props = {
  page?: PageDocument<string>;
  posts: Post[];
  settings: Settings;
  categories: CategoryProps[];
};

export default function Index({ page, posts, settings, categories }: Props) {
  return (
    <Page settings={settings} alternateLanguages={page.alternate_languages}>
      <Greeting settings={settings} />

      <main className={styles.container}>
        <section className={styles.latestPosts}>
          <h3 className="text">{filterTextSlice(page, 'list_latest_posts')}</h3>
          <div>
            {posts.map((post) => (
              <HorizontalCard key={post.uid} post={post} />
            ))}
          </div>
        </section>

        <section className={styles.sideLinks}>
          <div className={styles.categoriesContainer}>
            <h3 className="text">{filterTextSlice(page, 'list_categories')}</h3>

            <div>
              {categories.map((category) => (
                <LinkButton
                  key={category.slug}
                  url={`/category/${category.slug}`}
                  text={category.name}
                />
              ))}
            </div>
          </div>
          <div className={styles.popularContainer}>
            <h3 className="text">
              {filterTextSlice(page, 'list_popular_posts')}
            </h3>

            <ul>
              {posts.map((post) => (
                <li key={post.uid} className="text">
                  <Link href={`/posts/${post.uid}`}>
                    <a>
                      <PrismicText field={post.data.title} />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  previewData,
}) => {
  const client = createClient({ previewData });

  const page = await client.getByUID('page', 'home', { lang: locale });
  const settings = await client.getSingle('settings', { lang: locale });

  const posts = await client.getAllByType('post', {
    limit: 5,
    lang: locale,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  const categoriesResponse = await client.getAllByType('category', {
    limit: 10,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    lang: locale,
  });

  const categories = categoriesResponse.map((category) => {
    return {
      id: category.id,
      name: prismicH.asText(category.data.category_name),
      slug: category.uid,
    };
  });

  return {
    props: {
      page,
      posts,
      settings,
      categories,
    },
    revalidate: 60 * 60 * 24, // 24h
  };
};
