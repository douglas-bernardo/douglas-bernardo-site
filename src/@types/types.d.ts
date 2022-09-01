import { RichTextField } from '@prismicio/types';

export type Post = {
  uid: string;
  type: string;
  first_publication_date: string;
  last_publication_date: string;
  data: {
    title: [];
    featured_image: {
      alt: string;
      url: string;
    };
    read_minutes: number;
    published_at: string;
    slices: any;
  };
};

export type Slice = {
  id: string;
  slice_type: string;
  slice_label: null;
  primary: {
    text: [
      {
        type: string;
        text: string;
        spans: [];
      },
    ];
  };
};

export type Settings = {
  data: {
    greeting_text: RichTextField;
    description: RichTextField;
    profilePicture: {
      dimensions: {
        width: number;
        height: number;
      };
      alt: string;
      copyright: string;
      url: string;
    };
  };
};

export type Category = {
  name: string;
  slug: string;
};
