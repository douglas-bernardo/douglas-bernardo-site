import { DefaultSeoProps } from 'next-seo';

const title = 'Bean Codes';
const description = 'Um blog de desenvolvedor - Douglas Bernardo';
const openGraphImage1 = `${process.env.NEXT_PUBLIC_URL}/images/og-image-01.png`;
const openGraphImage2 = `${process.env.NEXT_PUBLIC_URL}/images/og-image-02.png`;

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
      {
        url: openGraphImage2,
        alt: 'Og Image Alt Second',
        width: 400,
        height: 400,
      },
    ],
  },
};
