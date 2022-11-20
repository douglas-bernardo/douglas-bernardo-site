import Link from 'next/link';

import * as prismicH from '@prismicio/helpers';

import { getExcerpt, timeDistance } from '../../helpers/utils';
import { Post } from '../../@types/types';

import styles from './styles.module.scss';
import { PrismicText } from '@prismicio/react';
import Image from 'next/image';
import { useTheme } from '../../context/theme';

type Props = {
  post: Post;
};

export function HorizontalCard({ post }: Props) {
  const { theme } = useTheme();

  const excerpt = getExcerpt(
    post.data.slices,
    prismicH.asText(post.data.title).length,
  );

  return (
    <div className={`${styles.cardContainer} ${styles[theme]}`}>
      <Link href={`/posts/${post.uid}`}>
        <a>
          <Image
            width={346}
            height={200}
            objectFit="cover"
            src={post.data.featured_image.url}
            alt={post.data.featured_image.alt}
          />
        </a>
      </Link>

      <div className={styles.cardBody}>
        <Link href={`/posts/${post.uid}`}>
          <a>
            <h2 className="text">
              <PrismicText field={post.data.title} />
            </h2>
          </a>
        </Link>
        <div className={styles.cardDate}>
          <time>{timeDistance(post.last_publication_date)}</time>
          <div className={styles.cardDateDivider} />
          <span>{`${post.data.read_minutes || 0} min read`}</span>
        </div>

        <p className={`text ${styles.excerpt}`}>{excerpt}</p>
      </div>
    </div>
  );
}
