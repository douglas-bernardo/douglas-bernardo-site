import { ReactNode } from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';
import { Layout } from '../Layout';
import { Settings } from '../../@types/types';
import { AlternateLanguage } from '@prismicio/types';

interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  path?: string;
  settings: Settings;
  alternateLanguages?: AlternateLanguage<string, string>[];
  children: ReactNode;
}

export function Page({
  title,
  description,
  path,
  settings,
  alternateLanguages,
  children,
  ...rest
}: Props) {
  const url = `${process.env.NEXT_PUBLIC_URL}${path}`;
  return (
    <Layout settings={settings} alternateLanguages={alternateLanguages}>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        {...rest}
      />
      {children}
    </Layout>
  );
}
