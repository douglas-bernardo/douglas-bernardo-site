import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';

import Head from 'next/head';
import Link from 'next/link';
import { Category, Post, Settings } from '../@types/types';

import { Greeting } from '../components/Greeting';
import { HorizontalCard } from '../components/HorizontalCard';
import { LinkButton } from '../components/LinkButton';
import { createClient } from '../services/prismicio';

import styles from './../styles/home.module.scss';
import { PrismicText } from '@prismicio/react';

type Props = {
  posts: Post[];
  settings: Settings;
  categories: Category[];
};

export default function Home({ posts, settings, categories }: Props) {
  return (
    <>
      <Head>
        <title>Beancodes</title>
      </Head>

      <Greeting settings={settings} />

      <main className={styles.container}>
        <section className={styles.latestPosts}>
          <h3 className="text">LATEST</h3>
          <div>
            {posts.map((post) => (
              <HorizontalCard key={post.uid} post={post} />
            ))}
          </div>
        </section>

        <section className={styles.sideLinks}>
          <div className={styles.categoriesContainer}>
            <h3 className="text">CATEGORIES</h3>

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
            <h3 className="text">POPULAR</h3>

            <ul>
              {posts.map((post) => (
                <Link key={post.uid} href={`/posts/${post.uid}`}>
                  <a>
                    <li className="text">
                      <PrismicText field={post.data.title} />
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData });

  const posts = await client.getAllByType('post', { limit: 5 });
  const categoriesResponse = await client.getAllByType('category', {
    limit: 6,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });
  const settings = await client.getSingle('settings');

  const categories = categoriesResponse.map((category) => {
    return {
      id: category.id,
      name: prismicH.asText(category.data.category_name),
      slug: category.uid,
    };
  });

  console.log(categoriesResponse);

  return {
    props: {
      posts,
      settings,
      categories,
    },
  };
};
