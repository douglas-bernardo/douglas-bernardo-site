import { RichTextField, ImageFieldImage } from '@prismicio/types';
import {
  AuthorDocumentData,
  CategoryDocumentData,
} from '../../.slicemachine/prismicio';

interface Author {
  data: {
    author_name: RichTextField;
  };
}

export type Post = {
  id: string;
  uid: string;
  type: string;
  tags: string[];
  first_publication_date: string;
  last_publication_date: string;
  data: {
    title: RichTextField;
    featured_image: ImageFieldImage;
    read_minutes: number;
    published_at: string;
    meta_title?: string;
    meta_description?: string;
    slices: any;
    author?: Author;
    category?: CategoryDocumentData;
  };
};

export type Settings = {
  data: {
    greeting_text: RichTextField;
    description: RichTextField;
    profilePicture: ImageFieldImage;
    copyright: RichTextField;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
  slug: string;
};
