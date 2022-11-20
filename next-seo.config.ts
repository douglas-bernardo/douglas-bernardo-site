import { DefaultSeoProps } from 'next-seo';

const title = 'Bean Codes';
const description = 'Um blog de desenvolvedor - Douglas Bernardo';
const openGraphImage1 = `${process.env.NEXT_PUBLIC_URL}/images/og-image-01.png`;

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
        url: openGraphImage1,
        alt: 'Og Image Alt',
        width: 500,
        height: 500,
      },
    ],
  },
};
