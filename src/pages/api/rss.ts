import { VercelRequest, VercelResponse } from '@vercel/node';
import RSS from 'rss';

import { createClient, linkResolver } from '../../services/prismicio';
import * as prismicH from '@prismicio/helpers';
import { metadata } from '../../../config';
import { TextSlice } from '../../../.slicemachine/prismicio';

export default async (request: VercelRequest, response: VercelResponse) => {
  const client = createClient();

  const posts = await client.getAllByType('post', {
    limit: 10,
    lang: 'pt-br',
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  const feed = new RSS({
    title: 'Beancodes',
    feed_url: `${metadata.siteUrl}/api/rss`,
    site_url: metadata.siteUrl,
    managingEditor: metadata.rssEditor,
    webMaster: metadata.rssEditor,
    copyright: `${new Date().getFullYear()} - ${metadata.author.name}`,
    pubDate: new Date(),
    ttl: 60,
  });

  posts.reduce((feed, post) => {
    const { uid, last_publication_date, tags, data } = post;

    feed.item({
      title: prismicH.asText(post.data.title),
      description: data.meta_description,
      date: last_publication_date,
      url: `${metadata.siteUrl}/posts/${uid}`,
      guid: `${metadata.siteUrl}/posts/${uid}`,
      categories: tags,
      custom_elements: [
        {
          'content:encodes': data.slices
            .map((slice: TextSlice) => prismicH.asHTML(slice.primary.text))
            .filter((item) => item != null)
            .toString(),
        },
      ],
    });

    return feed;
  }, feed);

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/xml');

  response.send(feed.xml());
};
