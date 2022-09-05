import { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { OpenGraphMedia } from 'next-seo/lib/types';

type Props = {
  title?: string;
  description?: string;
  path?: string;
  children: ReactNode;
  image?: OpenGraphMedia;
};

export function Page({ title, description, path, image, children }: Props) {
  const url = `${process.env.NEXT_PUBLIC_URL}${path}`;
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          title,
          images: image ? [image] : undefined,
        }}
      />
      {children}
    </>
  );
}
