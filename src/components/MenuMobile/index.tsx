import { useEffect, useState } from 'react';
import { useTheme } from '../../context/theme';
import { ToggleThemeButton } from '../ToggleThemeButton';

import styles from './styles.module.scss';

export function MenuMobile() {
  const { theme } = useTheme();
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
        <span className={`${active && styles.active} ${styles[theme]}`} />
        <span className={`${active && styles.active} ${styles[theme]}`} />
      </button>
      <div
        className={`${styles.menuMobileContainer} ${active && styles.active} ${
          styles[theme]
        }`}
      >
        <nav className={`${active && styles.animation} text`}>
          <a href="">Posts</a>
          <a href="">Back-end</a>
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

        <div className={`${styles.themeButton} ${active && styles.active}`}>
          <ToggleThemeButton />
        </div>
      </div>
    </>
  );
}
