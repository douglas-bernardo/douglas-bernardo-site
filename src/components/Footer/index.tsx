import { RiGithubLine, RiInstagramLine, RiTwitterLine } from 'react-icons/ri';
import { FiLinkedin } from 'react-icons/fi';

import styles from './styles.module.scss';
import { useTheme } from '../../context/theme';

export function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={`${styles.footerContainer} ${styles[theme]}`}>
      <div className={styles.footerContent}>
        <nav>
          <a
            href="https://github.com/douglas-bernardo"
            target="_blank"
            aria-label="Visite meu Github"
          >
            <RiGithubLine color="#121214" />
          </a>

          <a
            href="https://www.instagram.com/douglasb.dev/"
            target="_blank"
            aria-label="Visite meu Instagram"
          >
            <RiInstagramLine color="#121214" />
          </a>

          <a
            href="https://twitter.com/douglasbdev"
            target="_blank"
            aria-label="Visite meu Twitter"
          >
            <RiTwitterLine color="#121214" />
          </a>

          <a
            href="https://www.linkedin.com/in/douglas-bernardo/"
            target="_blank"
            aria-label="Visite meu LinkedIn"
          >
            <FiLinkedin color="#121214" />
          </a>
        </nav>
        <div>
          &copy;{' '}
          <p className="text">
            2022 - present Douglas Bernardo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
