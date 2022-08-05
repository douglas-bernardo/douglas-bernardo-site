import Link from 'next/link';

import styles from './styles.module.scss';

export function MiniCard() {
  return (
    <Link href={''}>
      <a href="">
        <div className={styles.cardContainer}>
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="cover"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            nesciunt ratione eos explicabo enim nulla quis, aliquid molestiae
            quod rem culpa ullam. Aut, laborum omnis.
          </p>
        </div>
      </a>
    </Link>
  );
}
