import Link from 'next/link';
import { AlternateLanguage } from '@prismicio/types';
import { linkResolver } from '../../services/prismicio';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { ActiveLink } from '../ActiveLink';

import { useTheme } from '../../context/theme';

import { FlagIcon } from '../FlagIcon';

import styles from './styles.module.scss';
import { RSSFeedButton } from '../RSSFeedButton';

const flagTitle = {
  'pt-br': 'Veja em Português',
  'en-us': 'View in English',
};

type Props = {
  alternateLanguages?: AlternateLanguage<string, string>[];
};

export function Header({ alternateLanguages }: Props) {
  const { theme } = useTheme();
  return (
    <header className={`${styles.headerContainer} ${styles[theme]}`}>
      <div className={styles.headerContent}>
        <div>
          <Link href="/">
            <a>
              <img src="/images/logo/logo.png" alt="logo" />
              <h2 className="text">Douglas Bernardo</h2>
            </a>
          </Link>

          <nav className="text">
            <ActiveLink activeClassName={styles.active} href="/">
              <a title="Posts">Posts</a>
            </ActiveLink>

            <ActiveLink activeClassName={styles.active} href="/back-end">
              <a title="Back-end">Back-end</a>
            </ActiveLink>

            <ActiveLink activeClassName={styles.active} href="/front-end">
              <a title="Front-end">Front-end</a>
            </ActiveLink>

            <ActiveLink activeClassName={styles.active} href="/mobile">
              <a title="Mobile">Mobile</a>
            </ActiveLink>

            <ActiveLink activeClassName={styles.active} href="/devops">
              <a title="DevOps">DevOps</a>
            </ActiveLink>
          </nav>

          <div className={styles.toggleButtons}>
            {alternateLanguages?.length > 0 &&
              alternateLanguages.map((lang) => (
                <Link
                  key={lang.lang}
                  href={linkResolver(lang)}
                  locale={lang.lang}
                >
                  <a title={flagTitle[lang.lang]}>
                    <FlagIcon lang={lang.lang} />
                  </a>
                </Link>
              ))}

            <ToggleThemeButton />

            <RSSFeedButton />
          </div>
        </div>
      </div>
    </header>
  );
}
