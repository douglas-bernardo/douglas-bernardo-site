import { ReactNode } from 'react';
import { useTheme } from '../../context/theme';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MenuMobile } from '../MenuMobile';

import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  const { theme } = useTheme();

  return (
    <div className={theme}>
      <div className={`background ${styles.container}`}>
        <MenuMobile />
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
