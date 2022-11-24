import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';

import { SliceZone } from '@prismicio/react';
import { components } from '../../../slices';
import { timeDistance } from '../../helpers/utils';

import { createClient, linkResolver } from '../../services/prismicio';
import { Post as PostProps } from '../../@types/types';
import { MiniCard } from '../../components/MiniCard';
import { Page } from '../../components/Page';

import styles from './post.module.scss';
import { SocialShareButtons } from '../../components/SocialShareButtons';

type Props = {
  post: PostProps;
  slug: string;
  latestSimilarPosts: PostProps[];
};

export default function Post({ post, slug, latestSimilarPosts }: Props) {
  // const router = useRouter();

  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Page
      title={prismicH.asText(post.data.title)}
      description={post.data.meta_description}
      path={`/posts/${slug}`}
      openGraph={{
        type: 'article',
        article: {
          publishedTime: post.first_publication_date,
          tags: post.tags,
        },
        images: [
          {
            url: post.data.featured_image.url,
            secureUrl: post.data.featured_image.url,
            alt: post.data.featured_image.alt,
            type: 'image/png',
            width: post.data.featured_image.dimensions.width,
            height: post.data.featured_image.dimensions.height,
          },
        ],
      }}
    >
      <main className={styles.container}>
        <article className={styles.post}>
          <h1 className="text">{prismicH.asText(post.data.title)}</h1>

          <div className={styles.publishedAt}>
            <time>{timeDistance(post.last_publication_date)}</time>
            <div className={styles.dateDivider} />
            <span>{`${post.data.read_minutes || 0} min read`}</span>
          </div>

          <div className={`${styles.postContent} text`}>
            <SliceZone slices={post.data.slices} components={components} />
          </div>
          <SocialShareButtons
            params={{
              url: `${process.env.NEXT_PUBLIC_URL}/posts/${slug}`,
              titlePost: prismicH.asText(post.data.title),
            }}
          />
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
    </Page>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({
//   params,
//   previewData,
// }) => {
//   const client = createClient({ previewData });
//   const { uid } = params;

//   const post = await client.getByUID('post', String(uid));
//   console.log(post);

//   const latestSimilarPosts = await client.getAllByType('post', {
//     limit: 3,
//     orderings: [
//       { field: 'document.first_publication_date', direction: 'desc' },
//     ],
//     predicates: [prismic.predicate.similar(post.id, 10)],
//   });

//   return {
//     props: {
//       post,
//       latestSimilarPosts,
//       slug: uid,
//     },
//   };
// };

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
      slug: uid,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = createClient();

  const posts = await client.getAllByType('post', {
    limit: 10,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  const paths = posts.map((article) => prismicH.asLink(article, linkResolver));

  return {
    paths,
    fallback: 'blocking',
  };
};
