import styles from './styles.module.scss';

import { ToggleThemeButton } from '../ToggleThemeButton';
import { useState } from 'react';
import { ToggleMenuNavBar } from '../ToggleMenuNavBar';

export function Header() {
  const [active, setActive] = useState(false);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>
          {/* <img src="/images/logo/logo.png" alt="logo" /> */}
          <h2>Bean Codes</h2>

          <nav>
            <a href="" className={styles.active} title="Posts">
              Posts
            </a>
            <a href="" title="Back-end">
              Back-end
            </a>
            <a href="" title="Front-end">
              Front-end
            </a>
            <a href="" title="Mobile">
              Mobile
            </a>
            <a href="" title="DevOps">
              DevOps
            </a>
          </nav>
        </div>

        <div className={styles.toggleDarkThemeButton}>
          <ToggleThemeButton />
        </div>

        <div className={styles.toggleNavButton}>
          <ToggleMenuNavBar />
        </div>
      </div>
    </header>
  );
}
