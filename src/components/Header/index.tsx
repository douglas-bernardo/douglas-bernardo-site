import styles from './styles.module.scss';

import { RiMoonFill } from 'react-icons/ri';
import { ToggleThemeButton } from '../ToggleThemeButton';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div>
          {/* <img src="/images/logo/logo.png" alt="logo" /> */}
          <h2>Bean Codes</h2>
        </div>

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

        <ToggleThemeButton />
      </div>
    </header>
  );
}
