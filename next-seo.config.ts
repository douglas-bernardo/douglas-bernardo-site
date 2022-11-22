import { DefaultSeoProps } from 'next-seo';

const title = 'Bean Codes';
const description = 'Um blog de desenvolvedor - Douglas Bernardo';

export const SEO: DefaultSeoProps = {
  titleTemplate: `%s | ${title}`,
  defaultTitle: title,
  description,
  twitter: {
    handle: '@beancodes',
    site: '@beancodes',
    cardType: 'summary_large_image',
  },
};
