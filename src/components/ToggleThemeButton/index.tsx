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
    >
      <ImSun />
    </button>
  ) : (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${styles.toggleTheme} ${styles.toggleThemeDark}`}
    >
      <RiMoonFill />
    </button>
  );
}
