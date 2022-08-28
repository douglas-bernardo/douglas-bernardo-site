import React, { ReactNode } from 'react';
import { ThemeProvider } from './theme';

type Props = {
  children: ReactNode;
};

export function AppProvider({ children }: Props) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
