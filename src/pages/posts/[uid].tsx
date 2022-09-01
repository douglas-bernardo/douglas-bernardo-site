import { GetStaticPaths, GetStaticProps } from 'next';
import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';

import Head from 'next/head';

import { Post as PostProps } from '../../@types/types';
import { MiniCard } from '../../components/MiniCard';
import { createClient } from '../../services/prismicio';

import styles from './post.module.scss';
import { SliceZone } from '@prismicio/react';
import { components } from '../../../slices';
import { timeDistance } from '../../helpers/utils';

type Props = {
  post: PostProps;
  latestSimilarPosts: PostProps[];
};

export default function Post({ post, latestSimilarPosts }: Props) {
  return (
    <>
      <Head>
        <title>{`${prismicH.asText(post.data.title)} | Bean Codes`}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1 className="text">{prismicH.asText(post.data.title)}</h1>

          <div className={styles.publishedAt}>
            <span>{timeDistance(post.last_publication_date)}</span>
            <div className={styles.dateDivider} />
            <span>{`${post.data.read_minutes || 0} min read`}</span>
          </div>

          <div className={`${styles.postContent} text`}>
            <SliceZone slices={post.data.slices} components={components} />
          </div>
        </article>
      </main>

      {latestSimilarPosts.length > 0 && (
        <div className={styles.similarPosts}>
          <h3 className="text">SIMILAR POSTS</h3>
          <div>
            {latestSimilarPosts.map((p) => (
              <MiniCard key={p.uid} post={p} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const post = await client.getByUID('post', String(uid));
  const latestSimilarPosts = await client.getAllByType('post', {
    limit: 3,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    predicates: [prismic.predicate.similar(post.id, 10)],
  });

  return {
    props: {
      post,
      latestSimilarPosts,
    },
    revalidate: 60 * 60 * 24, // 24h
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // const client = createClient();

  // const posts = await client.getAllByType('post');

  // console.log(posts);

  return {
    paths: [],
    fallback: 'blocking',
  };
};
