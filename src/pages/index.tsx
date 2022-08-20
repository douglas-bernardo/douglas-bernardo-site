import { GetStaticProps } from 'next';

import Head from 'next/head';
import Link from 'next/link';
import { Post } from '../@types/types';

import { Gretting } from '../components/Gretting';
import { HorizontalCard } from '../components/HorizontalCard';
import { LinkButton } from '../components/LinkButton';
import { createClient } from '../services/prismicio';

import styles from './home.module.scss';

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Post | BC</title>
      </Head>

      <Gretting />

      <main className={styles.container}>
        <section className={styles.latestPosts}>
          <h3>LATEST</h3>
          <div>
            {posts.map((post) => (
              <HorizontalCard key={post.uid} post={post} />
            ))}
          </div>
        </section>

        <section className={styles.sideLinks}>
          <div className={styles.categoriesContainer}>
            <h3>CATEGORIES</h3>

            <div>
              <LinkButton url="/posts/mock-doc-id" text="React.js" />
              <LinkButton url="/posts/mock-doc-id" text="Styled Components" />
              <LinkButton url="/posts/mock-doc-id" text="HTML" />
              <LinkButton url="/posts/mock-doc-id" text="Next.js" />
              <LinkButton url="/posts/mock-doc-id" text="React Native" />
              <LinkButton url="/posts/mock-doc-id" text="Node.js" />
            </div>
          </div>
          <div className={styles.popularContainer}>
            <h3>POPULAR</h3>

            <ul>
              <Link href={'/posts/mock-doc-id'}>
                <a>
                  <li>What if All I Want is a Mediocre Life?</li>
                </a>
              </Link>
              <Link href={'/posts/mock-doc-id'}>
                <a>
                  <li>10 Things Minimalists Don’t Do</li>
                </a>
              </Link>
              <Link href={'/posts/mock-doc-id'}>
                <a>
                  <li>
                    Why Simplifying May Protect Our Children’s Mental Health
                  </li>
                </a>
              </Link>
              <Link href={'/posts/mock-doc-id'}>
                <a>
                  <li>50 Simple Things You Need to Hear</li>
                </a>
              </Link>
              <Link href={'/posts/mock-doc-id'}>
                <a>
                  <li>How to Detangle Productivity and Your Self-Worth</li>
                </a>
              </Link>
              <Link href={'/posts/mock-doc-id'}>
                <a>
                  <li>How a “Do Nothing” Day Changed My Life</li>
                </a>
              </Link>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData });

  const posts = await client.getAllByType('post');

  // console.log(JSON.stringify(posts, null, 2));

  return {
    props: { posts },
  };
};
