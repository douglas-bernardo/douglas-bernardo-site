import React from 'react';
import { PrismicRichText } from '@prismicio/react';

const Text = ({ slice }) => (
  <>
    <PrismicRichText field={slice.primary.text} />
  </>
);

export default Text;
