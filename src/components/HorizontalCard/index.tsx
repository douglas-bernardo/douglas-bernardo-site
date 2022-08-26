import Link from 'next/link';

import { getExcerpt, timeDistance } from '../../helpers/utils';
import { Post } from '../../@types/types';

import styles from './styles.module.scss';
import { PrismicText } from '@prismicio/react';
import Image from 'next/image';

type Props = {
  post: Post;
};

export function HorizontalCard({ post }: Props) {
  const excerpt = getExcerpt(post.data.slices);

  return (
    <div className={styles.cardContainer}>
      <Link href={`/posts/${post.uid}`}>
        <a>
          <Image
            width={346}
            height={200}
            objectFit="cover"
            src={post.data.featured_image.url}
            alt={post.data.featured_image.alt}
            className="custom-img"
          />
        </a>
      </Link>

      <div className={styles.cardBody}>
        <Link href={`/posts/${post.uid}`}>
          <a>
            <h2>
              <PrismicText field={post.data.title} />
            </h2>
          </a>
        </Link>
        <div className={styles.cardDate}>
          <span>{timeDistance(post.last_publication_date)}</span>
          <div className={styles.cardDateDivider} />
          <span>{`${post.data.read_minutes || 0} min read`}</span>
        </div>

        <p>{excerpt}</p>
      </div>
    </div>
  );
}
