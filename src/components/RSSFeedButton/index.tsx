import Link from 'next/link';
import { RiRssFill } from 'react-icons/ri';

import styles from './styles.module.scss';

import { useTheme } from '../../context/theme';

export function RSSFeedButton() {
  const { theme } = useTheme();

  return (
    <>
      <Link href={'/api/rss'}>
        <a
          aria-label="Get RSS Feed"
          className={`${styles.linkFeed} ${styles[theme]}`}
          target="_blank"
          title="Feed RSS"
        >
          <RiRssFill />
        </a>
      </Link>
    </>
  );
}
