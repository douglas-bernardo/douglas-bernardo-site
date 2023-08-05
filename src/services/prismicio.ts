import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';
import sm from '../../slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Link Resolver. This function determines the URL for a given Prismic document.
 *
 * @type {prismicH.LinkResolverFunction}
 */
// Update the Link Resolver to match your project's route structure
export function linkResolver(doc: any) {
  switch (doc.type) {
    case 'page':
      if (doc.uid === 'home') {
        return '/';
      } else {
        return `/${doc.uid}`;
      }

    case 'category':
      return `/category/${doc.uid}`;

    case 'post':
      return `/posts/${doc.uid}`;

    default:
      null;
  }
}

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(sm.apiEndpoint);

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
