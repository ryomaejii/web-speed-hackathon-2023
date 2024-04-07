import classNames from 'classnames';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import type { ProductFragmentResponse } from '../../../graphql/fragments';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { WidthRestriction } from '../../foundation/WidthRestriction';

import * as styles from './ProductHeroImage.styles';

type Props = {
  product?: ProductFragmentResponse;
  title: string;
};

export const ProductHeroImage: FC<Props> = ({ product, title }) => {
  const thumbnailFile = product?.media.find((productMedia) => productMedia.isThumbnail)?.file;

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <WidthRestriction>
            <Link to={`/product/${product?.id}`}>
              <div className={styles.container()}>
                <img className={styles.image()} src={thumbnailFile?.filename} />

                <div className={styles.overlay()}>
                  <p
                    className={classNames(styles.title(), {
                      [styles.title__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.title__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {title}
                  </p>
                  <p
                    className={classNames(styles.description(), {
                      [styles.description__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.description__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    {product?.name ?? '商品名'}
                  </p>
                </div>
              </div>
            </Link>
          </WidthRestriction>
        );
      }}
    </GetDeviceType>
  );
};
