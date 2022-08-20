import React, { useState } from 'react';

import * as prismicH from '@prismicio/helpers';
import { Element as Elements } from '@prismicio/helpers';

import { FiCopy } from 'react-icons/fi';
import { IoCheckbox } from 'react-icons/io5';

import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import yaml from 'highlight.js/lib/languages/yaml';
import csharp from 'highlight.js/lib/languages/csharp';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('json', json);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('xml', xml);

import styles from './styles.module.scss';

const CodeBlock = ({ slice }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  function htmlSerializer(type, element, text, children) {
    if (type === Elements.preformatted) {
      return `<pre>${
        hljs.highlight(element.text, {
          language: slice.primary.language,
        }).value
      }</pre>`;
    }
  }

  function copyToClipBoard() {
    const code = prismicH.asText(slice.primary.preformatted);

    navigator.clipboard.writeText(code);
    setCopySuccess(true);

    setTimeout(() => {
      setCopySuccess(false);
    }, 1500);
  }

  return (
    <>
      {prismicH.isFilled.richText(slice.primary.preformatted) && (
        <div className={styles.container}>
          <div className={styles.header}>
            <div title="Language">{slice.primary.language}</div>
            <button
              onClick={copyToClipBoard}
              type="button"
              title="Copy to clipboard"
            >
              {copySuccess ? (
                <IoCheckbox color="#c4c4cc" />
              ) : (
                <FiCopy color="#c4c4cc" />
              )}
            </button>
          </div>
          <div
            className="hljs"
            dangerouslySetInnerHTML={{
              __html: prismicH.asHTML(
                slice.primary.preformatted,
                null,
                htmlSerializer,
              ),
            }}
          />
        </div>
      )}
    </>
  );
};

export default CodeBlock;
