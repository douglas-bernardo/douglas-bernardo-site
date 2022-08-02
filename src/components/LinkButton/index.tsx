import Link from 'next/link';
import styles from './styles.module.scss';

type Props = {
  url: string;
  text: string;
};

export function LinkButton({ url, text }: Props) {
  return (
    <Link href={url}>
      <a className={styles.linkButton}>
        <p>{text}</p>
      </a>
    </Link>
  );
}
