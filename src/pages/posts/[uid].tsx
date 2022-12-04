import { GetStaticPaths, GetStaticProps } from 'next';

import * as prismicH from '@prismicio/helpers';
import * as prismic from '@prismicio/client';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import { components } from '../../../slices';
import { timeDistance } from '../../helpers/utils';

import { createClient, linkResolver } from '../../services/prismicio';
import { Post as PostProps, Settings } from '../../@types/types';
import { MiniCard } from '../../components/MiniCard';
import { Page } from '../../components/Page';

import { useTheme } from '../../context/theme';
import { SocialShareButtons } from '../../components/SocialShareButtons';

import styles from './post.module.scss';

type Props = {
  post: PostProps;
  slug: string;
  settings: Settings;
  latestSimilarPosts: PostProps[];
};

export default function Post({
  post,
  slug,
  settings,
  latestSimilarPosts,
}: Props) {
  const { theme } = useTheme();

  return (
    <Page
      settings={settings}
      title={prismicH.asText(post.data.title)}
      description={post.data.meta_description}
      alternateLanguages={post.alternate_languages}
      path={`/posts/${slug}`}
      openGraph={{
        type: 'article',
        article: {
          publishedTime: post.first_publication_date,
          tags: post.tags,
          authors: [prismicH.asText(post.data.author.data.author_name)],
        },
        images: [
          {
            url: post.data.featured_image.url,
            secureUrl: post.data.featured_image.url,
            alt: post.data.featured_image.alt,
            type: 'image/jpeg',
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
            <small className="text">
              {prismicH.asText(post.data.author.data.author_name)}
            </small>
            <div className={`${styles.dateDivider} ${styles[theme]}`} />
            <time className="text">
              {timeDistance(post.last_publication_date, post.lang)}
            </time>
            <div className={`${styles.dateDivider} ${styles[theme]}`} />
            <span className="text">{`${
              post.data.read_minutes || 0
            } min read`}</span>
          </div>

          <div className={`${styles.postContent} text`}>
            <SliceZone slices={post.data.slices} components={components} />
          </div>
          <SocialShareButtons
            params={{
              url: `${process.env.NEXT_PUBLIC_URL}/posts/${slug}`,
              titlePost: prismicH.asText(post.data.title),
              shareMessage: prismicH.asText(settings.data.share_message),
            }}
          />
        </article>
      </main>

      {latestSimilarPosts.length > 0 && (
        <div className={styles.similarPosts}>
          <h3 className="text">
            {<PrismicRichText field={settings.data.similar_posts} />}
          </h3>
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

export const getStaticProps: GetStaticProps = async ({
  locale,
  params,
  previewData,
}) => {
  const client = createClient({ previewData });
  const { uid } = params;

  const settings = await client.getSingle('settings', { lang: locale });

  const post = await client.getByUID('post', String(uid), {
    fetchLinks: 'author.author_name',
    lang: locale,
  });

  const latestSimilarPosts = await client.getAllByType('post', {
    limit: 3,
    lang: locale,
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
    predicates: [prismic.predicate.similar(post.id, 10)],
  });

  return {
    props: {
      settings,
      post,
      latestSimilarPosts,
      slug: uid,
    },
    revalidate: 60 * 60 * 24, // 24h
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
