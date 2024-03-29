const prismic = require('@prismicio/client');

const sm = require('./slicemachine.config.json');

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['images.prismic.io'],
//   },
// };

const nextConfig = async () => {
  const client = prismic.createClient(sm.apiEndpoint);

  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);

  return {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['images.prismic.io'],
    },
    i18n: {
      // These are all the locales you want to support in
      // your application
      locales,
      // This is the default locale you want to be used when visiting
      // a non-locale prefixed path e.g. `/hello`
      defaultLocale: locales[0],
      localeDetection: false,
    },
  };
};

module.exports = nextConfig;
