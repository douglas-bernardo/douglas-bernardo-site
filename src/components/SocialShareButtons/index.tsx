import { cloneElement, ReactElement } from 'react';
import {
  FaLinkedinIn,
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';

import { useTheme } from '../../context/theme';

import styles from './styles.module.scss';

interface SocialShareProvider {
  shareUrl: string;
  display: ReactElement;
}
const socialShareMap: Record<string, SocialShareProvider> = {
  linkedin: {
    shareUrl:
      'https://www.linkedin.com/shareArticle?mini=true&url=urlPost&title=titlePost&source=sourcePost',
    display: <FaLinkedinIn />,
  },
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=urlPost',
    display: <FaFacebook />,
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?text=urlPost',
    display: <FaTwitter />,
  },
  telegram: {
    shareUrl: 'https://t.me/share/url?url=urlPost',
    display: <FaTelegram />,
  },
  whatsapp: {
    shareUrl: 'https://api.whatsapp.com/send?text=titlePost: urlPost',
    display: <FaWhatsapp />,
  },
};

interface Props {
  params: {
    url: string;
    titlePost: string;
  };
}

export function SocialShareButtons({ params }: Props) {
  const { theme } = useTheme();

  const className = `${styles[theme]}`;

  const linkParams = {
    urlPost: params.url,
    titlePost: params.titlePost,
    sourcePost: 'company/beancodes/',
  };

  return (
    <div className={styles.container}>
      <p className="text">Compartilhe este Post:</p>
      <ul>
        {Object.entries(socialShareMap).map(
          ([socialShareItemKey, socialShareProvider]) => (
            <li key={socialShareItemKey}>
              <a
                href={`${socialShareProvider.shareUrl.replace(
                  /urlPost|titlePost|sourcePost/gi,
                  (matched) => linkParams[matched],
                )}`}
                target="_blank"
              >
                {cloneElement(socialShareProvider.display, { className })}
              </a>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
