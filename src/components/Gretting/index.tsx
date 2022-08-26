import * as prismicH from '@prismicio/helpers';
import { PrismicText } from '@prismicio/react';

import Image from 'next/image';

import { Settings } from '../../@types/types';
import styles from './styles.module.scss';

type Props = {
  settings: Settings;
};

export function Gretting({ settings }: Props) {
  const { name, description, profilePicture } = settings.data;

  return (
    <div className={styles.grettingContainer}>
      <div className={styles.grettingContent}>
        <div className={styles.grettingContentInfo}>
          {prismicH.isFilled.image(profilePicture) && (
            <Image
              src={profilePicture.url}
              width={60}
              height={60}
              objectFit="cover"
            />
          )}

          <div className={styles.grettingData}>
            {prismicH.isFilled.richText(name) && (
              <p>
                <PrismicText field={name} />
              </p>
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
