import Link from 'next/link';
import { Post } from '../../@types/types';
import { useTheme } from '../../context/theme';
import { getExcerpt } from '../../helpers/utils';

import styles from './styles.module.scss';

type Props = {
  post: Post;
};

export function MiniCard({ post }: Props) {
  const { theme } = useTheme();
  const excerpt = getExcerpt(post.data.slices);

  return (
    <Link href={`/posts/${post.uid}`}>
      <a>
        <div className={`${styles.cardContainer} ${styles[theme]}`}>
          <img
            src={post.data.featured_image.url}
            alt={post.data.featured_image.alt}
          />
          <p className="text">{excerpt}</p>
        </div>
      </a>
    </Link>
  );
}
