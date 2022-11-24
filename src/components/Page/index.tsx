import { ReactNode } from 'react';
import { NextSeo, NextSeoProps } from 'next-seo';

interface Props extends NextSeoProps {
  title?: string;
  description?: string;
  path?: string;
  children: ReactNode;
}

export function Page({ title, description, path, children, ...rest }: Props) {
  const url = `${process.env.NEXT_PUBLIC_URL}${path}`;
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        {...rest}
      />
      {children}
    </>
  );
}
