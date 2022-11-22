import { GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';

import Link from 'next/link';
import { CategoryProps, Post, Settings } from '../@types/types';

import { Greeting } from '../components/Greeting';
import { HorizontalCard } from '../components/HorizontalCard';
import { LinkButton } from '../components/LinkButton';
import { createClient } from '../services/prismicio';

import styles from './../styles/home.module.scss';
import { PrismicText } from '@prismicio/react';
import { Page } from '../components/Page';

const openGraphImage1 = `${process.env.NEXT_PUBLIC_URL}/images/og-image-01.png`;

type Props = {
  posts: Post[];
  settings: Settings;
  categories: CategoryProps[];
};

export default function Home({ posts, settings, categories }: Props) {
  return (
    <Page
      openGraph={{
        type: 'website',
        locale: 'pt_BR',
        url: 'https://beancodes.com/',
        site_name:
          'Beancodes: Um blog de desenvolvedor de software por Douglas Bernardo',
        images: [
          {
            url: openGraphImage1,
            alt: 'Og Image Alt',
            width: 500,
            height: 500,
            type: 'image/jpeg',
          },
        ],
      }}
    >
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

  return {
    props: {
      posts,
      settings,
      categories,
    },
    revalidate: 60 * 60 * 24, // 24 h
  };
};
