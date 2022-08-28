import { GetStaticProps } from 'next';
import Head from 'next/head';

import styles from './../styles/page.module.scss';

type PageProps = {
  slug: string;
};

export default function Page({ slug }: PageProps) {
  return (
    <>
      <Head>
        <title>| Bean Codes</title>
      </Head>

      <section className={styles.container}>
        <h2 className="text">Under Construction...</h2>
        <img src="/images/working-from-home.svg" alt="under construction" />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { uid } = params;
  console.log(uid);

  return {
    props: {
      slug: uid,
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
