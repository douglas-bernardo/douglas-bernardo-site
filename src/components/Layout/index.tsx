import { ReactNode } from 'react';
import * as prismicH from '@prismicio/helpers';

import { Settings } from '../../@types/types';
import { useTheme } from '../../context/theme';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { MenuMobile } from '../MenuMobile';

import styles from './styles.module.scss';

type Props = {
  settings: Settings;
  children: ReactNode;
};

export function Layout({ settings, children }: Props) {
  const { theme } = useTheme();
  const copyright = prismicH.asText(settings.data.copyright);
  return (
    <div className={theme}>
      <div className={`background ${styles.container}`}>
        <MenuMobile />
        <Header />
        {children}
        <Footer copyright={copyright} />
      </div>
    </div>
  );
}
