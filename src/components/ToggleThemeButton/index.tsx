import { RiMoonFill } from 'react-icons/ri';
import { ImSun } from 'react-icons/im';

import styles from './styles.module.scss';

export function ToggleThemeButton() {
  const isDarkTheme = false;

  return isDarkTheme ? (
    <button
      type="button"
      className={`${styles.toggleTheme} ${styles.toggleThemeLight}`}
    >
      <ImSun color="#121214" />
    </button>
  ) : (
    <button
      type="button"
      className={`${styles.toggleTheme} ${styles.toggleThemeDark}`}
    >
      <RiMoonFill color="#121214" />
    </button>
  );
}
