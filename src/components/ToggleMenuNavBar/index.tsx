import { useState } from 'react';

import styles from './styles.module.scss';

export function ToggleMenuNavBar() {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setActive(!active)}
      className={styles.toggleMenuNavBar}
    >
      <span className={`${active && styles.active}`} />
      <span className={`${active && styles.active}`} />
    </button>
  );
}
