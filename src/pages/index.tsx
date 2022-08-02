import Head from 'next/head';
import Link from 'next/link';
import { Gretting } from '../components/Gretting';
import { HorizontalCard } from '../components/HorizontalCard';
import { LinkButton } from '../components/LinkButton';

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
              <LinkButton url="" text="React.js" />
              <LinkButton url="" text="Styled Components" />
              <LinkButton url="" text="Node.js" />
              <LinkButton url="" text="Next.js" />
            </div>
          </div>
          <div className={styles.popularContainer}>
            <h3>POPULAR</h3>

            <ul>
              <Link href={''}>
                <a href="">
                  <li>What if All I Want is a Mediocre Life?</li>
                </a>
              </Link>
              <Link href={''}>
                <a href="">
                  <li>10 Things Minimalists Don’t Do</li>
                </a>
              </Link>
              <Link href={''}>
                <a href="">
                  <li>
                    Why Simplifying May Protect Our Children’s Mental Health
                  </li>
                </a>
              </Link>
              <Link href={''}>
                <a href="">
                  <li>50 Simple Things You Need to Hear</li>
                </a>
              </Link>
              <Link href={''}>
                <a href="">
                  <li>How to Detangle Productivity and Your Self-Worth</li>
                </a>
              </Link>
              <Link href={''}>
                <a href="">
                  <li>How a “Do Nothing” Day Changed My Life</li>
                </a>
              </Link>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
