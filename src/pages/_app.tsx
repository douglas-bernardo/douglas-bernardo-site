import { AppProps } from 'next/app';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import '../styles/_global.scss';
import styles from './app.module.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.container}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
