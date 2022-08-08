import Link from 'next/link';

import { RiGithubLine, RiInstagramLine, RiTwitterLine } from 'react-icons/ri';
import { FiLinkedin } from 'react-icons/fi';

import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <nav>
          <a href="https://github.com/douglas-bernardo" target="_blank">
            <RiGithubLine color="#121214" />
          </a>

          <a href="https://www.instagram.com/douglasb.dev/" target="_blank">
            <RiInstagramLine color="#121214" />
          </a>

          <a href="https://twitter.com/douglasbdev" target="_blank">
            <RiTwitterLine color="#121214" />
          </a>

          <a
            href="https://www.linkedin.com/in/douglas-bernardo/"
            target="_blank"
          >
            <FiLinkedin color="#121214" />
          </a>
        </nav>
        <div>&copy; 2022 - present Douglas Bernardo. All Rights Reserved.</div>
      </div>
    </footer>
  );
}
