import Link from 'next/link';

import { RiGithubLine, RiInstagramLine, RiTwitterLine } from 'react-icons/ri';
import { FiLinkedin } from 'react-icons/fi';

import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <nav>
          <Link href={''}>
            <a href="">
              <RiGithubLine color="#121214" />
            </a>
          </Link>
          <Link href={''}>
            <a href="">
              <RiInstagramLine color="#121214" />
            </a>
          </Link>
          <Link href={''}>
            <a href="">
              <RiTwitterLine color="#121214" />
            </a>
          </Link>
          <Link href={''}>
            <a href="">
              <FiLinkedin color="#121214" />
            </a>
          </Link>
        </nav>

        <div>&copy; 2022-present Douglas Bernardo. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
