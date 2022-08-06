import { RiMoonFill } from 'react-icons/ri';
import { ImSun } from 'react-icons/im';

import styles from './styles.module.scss';
import { useState } from 'react';

export function ToggleThemeButton() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return isDarkTheme ? (
    <button
      type="button"
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`${styles.toggleTheme} ${styles.toggleThemeLight}`}
    >
      <ImSun color="#121214" />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      className={`${styles.toggleTheme} ${styles.toggleThemeDark}`}
    >
      <RiMoonFill color="#121214" />
    </button>
  );
}
