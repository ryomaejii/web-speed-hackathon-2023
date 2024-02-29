import classNames from 'classnames';
import type { FC } from 'react';
import { useState } from 'react';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { AspectRatio } from '../../foundation/AspectRatio';

import { MediaItem } from './MediaItem';
import { MediaItemPreviewer } from './MediaItemPreviewer';
import * as styles from './ProductMediaListPreviewer.styles';

type Props = {
  product: ProductFragmentResponse | undefined;
};

export const ProductMediaListPreviewer: FC<Props> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const dummyPreviewFiles = [
    {
      filename: 'https://via.placeholder.com/300',
      id: 0,
    },
    {
      filename: 'https://via.placeholder.com/300',
      id: 1,
    },
    {
      filename: 'https://via.placeholder.com/300',
      id: 2,
    },
  ];

  if (
    product === undefined
    /*
    || product.media.length === 0
    */
  ) {
    return null;
  }

  return (
    <div className={styles.container()}>
      <AspectRatio ratioHeight={9} ratioWidth={16}>
        {/* <MediaItemPreviewer file={product.media[activeIndex].file} /> */}
        <MediaItemPreviewer file={dummyPreviewFiles[0]} />
      </AspectRatio>
      <div className={styles.itemListWrapper()}>
        <ul className={styles.itemList()}>
          {dummyPreviewFiles.map((media, index) => {
            const disabled = index === activeIndex;

            return (
              <li key={media.id} className={styles.item()}>
                <AspectRatio ratioHeight={1} ratioWidth={1}>
                  <button
                    className={classNames(styles.itemSelectButton(), {
                      [styles.itemSelectButton__disabled()]: disabled,
                    })}
                    disabled={disabled}
                    onClick={() => setActiveIndex(index)}
                  >
                    <MediaItem file={media} />
                  </button>
                </AspectRatio>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
