import { DefaultSeoProps } from 'next-seo';

const title = 'Beancodes';
const description = 'Um blog de desenvolvedor - Douglas Bernardo';
const openGraphImage = `${process.env.NEXT_PUBLIC_URL}/images/og-default.png`;

export const SEO: DefaultSeoProps = {
  titleTemplate: `%s | ${title}`,
  defaultTitle: title,
  description,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://beancodes.com/',
    site_name: 'Beancodes',
    images: [
      {
        url: openGraphImage,
        alt: 'Og Image Alt',
        width: 500,
        height: 500,
      },
    ],
  },
};
