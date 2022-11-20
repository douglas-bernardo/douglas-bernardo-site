import React from 'react';
import * as prismicH from '@prismicio/helpers';

import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';

import styles from './styles.module.scss';

const Image = ({ slice }) => {
  const image = slice.primary.image;
  return (
    <>
      <figure className={styles.container}>
        {prismicH.isFilled.image(image) && (
          <div>
            {/* <img src={slice.primary.image.url} alt={slice.primary.image.alt} /> */}
            <PrismicNextImage
              field={image}
              layout={
                slice.variation === 'default' ? 'intrinsic' : 'responsive'
              }
              priority
              crossOrigin="anonymous"
            />
          </div>
        )}
        {prismicH.isFilled.richText(slice.primary.caption) && (
          <figcaption className={styles.caption}>
            <PrismicRichText field={slice.primary.caption} />
          </figcaption>
        )}
      </figure>
    </>
  );
};

export default Image;
