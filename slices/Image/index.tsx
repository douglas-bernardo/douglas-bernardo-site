import React from 'react';

const Image = ({ slice }) => (
  <>
    <img src={slice.primary.image.url} alt={slice.primary.image.alt} />
  </>
);

export default Image;
