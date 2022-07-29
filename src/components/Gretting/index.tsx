import styles from './styles.module.scss';

export function Gretting() {
  return (
    <div className={styles.grettingContainer}>
      <div className={styles.grettingContent}>
        <img
          src="https://avatars.githubusercontent.com/u/29052049?v=4"
          alt="avatar"
        />

        <div className={styles.grettingContentInfo}>
          <p>
            Personal Blog by <span>Douglas Bernardo</span>
          </p>
          <p>Thinking, coding and living</p>
        </div>
      </div>
    </div>
  );
}
