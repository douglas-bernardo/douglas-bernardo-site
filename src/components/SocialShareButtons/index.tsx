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
  areaLabel: string;
}
const socialShareMap: Record<string, SocialShareProvider> = {
  linkedin: {
    shareUrl:
      'https://www.linkedin.com/shareArticle?mini=true&url=urlPost&title=titlePost&source=sourcePost',
    display: <FaLinkedinIn />,
    areaLabel: 'Compartilhe esse post no LinkedIn',
  },
  facebook: {
    shareUrl: 'https://www.facebook.com/sharer/sharer.php?u=urlPost',
    display: <FaFacebook />,
    areaLabel: 'Compartilhe esse post no Facebook',
  },
  twitter: {
    shareUrl: 'https://twitter.com/intent/tweet?text=urlPost',
    display: <FaTwitter />,
    areaLabel: 'Compartilhe esse post no Twitter',
  },
  telegram: {
    shareUrl: 'https://t.me/share/url?url=urlPost',
    display: <FaTelegram />,
    areaLabel: 'Compartilhe esse post no Telegram',
  },
  whatsapp: {
    shareUrl: 'https://api.whatsapp.com/send?text=titlePost: urlPost',
    display: <FaWhatsapp />,
    areaLabel: 'Compartilhe esse post no Whatsapp',
  },
};

interface Props {
  params: {
    url: string;
    titlePost: string;
    shareMessage?: string;
  };
}

export function SocialShareButtons({ params }: Props) {
  const { theme } = useTheme();

  const className = `${styles[theme]}`;

  const linkParams = {
    urlPost: params.url,
    titlePost: params.titlePost,
    sourcePost: 'company/douglasbernardo/',
  };

  return (
    <div className={styles.container}>
      <p className="text">{params.shareMessage}</p>
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
                aria-label={socialShareProvider.areaLabel}
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
