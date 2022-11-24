import { GetStaticProps } from 'next';
import { capitalize } from '../helpers/utils';

import { Page as SEOPageComponent } from '../components/Page';
import styles from './../styles/page.module.scss';

type PageProps = {
  slug: string;
};

export default function Page({ slug }: PageProps) {
  return (
    <SEOPageComponent title={capitalize(String(slug))} path={`/${slug}`}>
      <section className={styles.container}>
        <h2 className="text">Under Construction...</h2>
        <img src="/images/working-from-home.svg" alt="under construction" />
      </section>
    </SEOPageComponent>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { uid } = params;

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
