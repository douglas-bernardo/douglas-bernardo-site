import { format, parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import enUS from 'date-fns/locale/en-US';

import * as prismicH from '@prismicio/helpers';
import { PageDocument, TextSlice } from '../../prismicio-types';
// import { PageDocument, TextSlice } from '../../.slicemachine/prismicio';

const localeOptions = {
  'pt-br': ptBR,
  'en-us': enUS,
};

export const findFirstImage = (slices: any) => {
  const imageSlice = slices.find((slice) => slice.slice_type === 'image');

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

export const getExcerpt = (slices: any, rangeMin = 0): string => {
  const text = slices
    .filter((slice) => slice.slice_type === 'text')
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(' ');

  let excerpt = '';

  if (rangeMin <= 30) {
    excerpt = text.substring(0, 300);
  } else {
    excerpt = text.substring(0, 100);
  }

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(' ')) + ' […]';
  } else {
    return excerpt;
  }
};

export function dateFormatter(date: string): string {
  return format(parseISO(date), 'PP');
}

export function hourFormatter(date: string): string {
  return format(parseISO(date), 'p');
}

export function timeDistance(date: string, locale = 'pt-br'): string {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
    locale: localeOptions[locale],
  });
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function filterTextSlice(document: PageDocument<string>, key: string) {
  const text = document?.data.slices.find(
    (s: TextSlice) => s.primary.label === key,
  );

  return prismicH.asText(text?.primary.text) || '';
}
