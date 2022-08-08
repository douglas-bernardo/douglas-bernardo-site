import { useEffect, useState } from 'react';
import { ToggleThemeButton } from '../ToggleThemeButton';

import styles from './styles.module.scss';

export function MenuMobile() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = active ? 'hidden' : 'auto';
  }, [active]);

  return (
    <>
      <button
        type="button"
        onClick={() => setActive(!active)}
        className={styles.toggleMenuNavBarButton}
      >
        <span className={`${active && styles.active}`} />
        <span className={`${active && styles.active}`} />
      </button>
      <div
        className={`${styles.menuMobileContainer} ${active && styles.active}`}
      >
        <nav>
          <a href="">Posts</a>
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

        <div className={styles.themeButton}>
          <ToggleThemeButton />
        </div>
      </div>
    </>
  );
}
