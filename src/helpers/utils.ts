import { format, parseISO, formatDistance } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import * as prismicH from '@prismicio/helpers';

export const findFirstImage = (slices: any) => {
  const imageSlice = slices.find((slice) => slice.slice_type === 'image');

  if (imageSlice && prismicH.isFilled.image(imageSlice.primary.image)) {
    return imageSlice.primary.image;
  }
};

export const getExcerpt = (slices: any): string => {
  const text = slices
    .filter((slice) => slice.slice_type === 'text')
    .map((slice) => prismicH.asText(slice.primary.text))
    .join(' ');

  const excerpt = text.substring(0, 300);

  if (text.length > 300) {
    return excerpt.substring(0, excerpt.lastIndexOf(' ')) + '…';
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

export function timeDistance(date: string): string {
  return formatDistance(parseISO(date), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
