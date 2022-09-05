import { RiMoonFill } from 'react-icons/ri';
import { ImSun } from 'react-icons/im';

import styles from './styles.module.scss';

import { useTheme } from '../../context/theme';

export function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return theme === 'dark' ? (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggleTheme} ${styles.toggleThemeLight}`}
      aria-label="change to light theme"
    >
      <ImSun />
    </button>
  ) : (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggleTheme} ${styles.toggleThemeDark}`}
      aria-label="change to dark theme"
    >
      <RiMoonFill />
    </button>
  );
}
