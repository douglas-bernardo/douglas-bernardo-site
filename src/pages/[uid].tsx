import { GetStaticProps } from 'next';
import { capitalize } from '../helpers/utils';

import { Page as SEOPage } from '../components/Page';
import styles from './../styles/page.module.scss';

type PageProps = {
  slug: string;
};

export default function Page({ slug }: PageProps) {
  return (
    <SEOPage
      title={`${capitalize(String(slug))} | Beancodes`}
      description="Under Construction..."
      path={`/${slug}`}
    >
      <section className={styles.container}>
        <h2 className="text">Under Construction...</h2>
        <img src="/images/working-from-home.svg" alt="under construction" />
      </section>
    </SEOPage>
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
