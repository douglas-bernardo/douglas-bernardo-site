import * as prismicH from '@prismicio/helpers';
import { PrismicRichText, PrismicText } from '@prismicio/react';

import Image from 'next/image';

import { Settings } from '../../@types/types';
import styles from './styles.module.scss';

type Props = {
  settings: Settings;
};

export function Greeting({ settings }: Props) {
  const { greeting_text, description, profilePicture } = settings.data;

  return (
    <div className={styles.greetingContainer}>
      <div className={styles.greetingContent}>
        <div className={styles.greetingContentInfo}>
          {prismicH.isFilled.image(profilePicture) && (
            <Image
              src={profilePicture.url}
              width={60}
              height={60}
              objectFit="cover"
              alt="avatar photo"
            />
          )}

          <div className={`${styles.greetingData} text`}>
            {prismicH.isFilled.richText(greeting_text) && (
              <PrismicRichText field={greeting_text} />
            )}
            {prismicH.isFilled.richText(description) && (
              <p>
                <PrismicText field={description} />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
