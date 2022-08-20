import styles from './styles.module.scss';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { ActiveLink } from '../ActiveLink';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>
          {/* <img src="/images/logo/logo.png" alt="logo" /> */}
          <h2>Bean Codes</h2>

          <nav>
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
        </div>

        <div className={styles.toggleDarkThemeButton}>
          <ToggleThemeButton />
        </div>
      </div>
    </header>
  );
}
