import Head from 'next/head';
import Link from 'next/link';
import { Gretting } from '../components/Gretting';
import { HorizontalCard } from '../components/HorizontalCard';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>Post | BC</Head>
      <Gretting />
      <main className={styles.contentContainer}>
        <section className={styles.latestPosts}>
          <h3>LATEST</h3>
          <div>
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
            <HorizontalCard />
          </div>
        </section>

        <section className={styles.sideLinks}>
          <div className={styles.categoriesContainer}>
            <h3>CATEGORIES</h3>

            <div>
              <Link href={''}>
                <a>
                  <p>React.js</p>
                </a>
              </Link>
              <Link href={''}>
                <a>
                  <p>Styled Components</p>
                </a>
              </Link>
              <Link href={''}>
                <a>
                  <p>Node.js</p>
                </a>
              </Link>
              <Link href={''}>
                <a>
                  <p>Next.js</p>
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.popularContainer}>
            <h3>POPULAR</h3>
          </div>
        </section>
      </main>
    </>
  );
}
