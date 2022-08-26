import React from 'react';

import { PrismicNextImage } from '@prismicio/next';

const Image = ({ slice }) => {
  const image = slice.primary.image;
  return (
    <>
      {/* <img src={slice.primary.image.url} alt={slice.primary.image.alt} /> */}
      <PrismicNextImage
        field={image}
        layout="responsive"
        objectFit="cover"
        priority
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Image;
