import classNames from 'classnames';
import * as currencyFormatter from 'currency-formatter';
import type { ChangeEventHandler, FC } from 'react';
import { Link } from 'react-router-dom';

import type { ShoppingCartItemFragmentResponse } from '../../../graphql/fragments';
import { useActiveOffer } from '../../../hooks/useActiveOffer';
import { normalizeCartItemCount } from '../../../utils/normalize_cart_item';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { Image } from '../../foundation/Image';
import { OutlineButton } from '../../foundation/OutlineButton';
import { ProductOfferLabel } from '../../product/ProductOfferLabel';

import * as styles from './CartItem.styles';

type Props = {
  item: ShoppingCartItemFragmentResponse;
  onUpdate: (productId: number, count: number) => void;
  onRemove: (productId: number) => void;
};

export const CartItem: FC<Props> = ({ item, onRemove, onUpdate }) => {
  const thumbnailFile = item.product.media.find((productMedia) => productMedia.isThumbnail)?.file;
  const { activeOffer } = useActiveOffer(item.product);
  const price = activeOffer?.price ?? item.product.price;

  const updateCount: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const count = normalizeCartItemCount(ev.target.valueAsNumber || 1);
    onUpdate(item.product.id, count);
  };

  return (
    <GetDeviceType>
      {({ deviceType }) => {
        return (
          <div
            className={classNames(styles.container(), {
              [styles.container__desktop()]: deviceType === DeviceType.DESKTOP,
              [styles.container__mobile()]: deviceType === DeviceType.MOBILE,
            })}
          >
            <div className={styles.item()}>
              <Link to={`/product/${item.product.id}`}>
                <div className={styles.itemInner()}>
                  {thumbnailFile ? (
                    <div
                      className={classNames(styles.thumbnail(), {
                        [styles.thumbnail__desktop()]: deviceType === DeviceType.DESKTOP,
                        [styles.thumbnail__mobile()]: deviceType === DeviceType.MOBILE,
                      })}
                    >
                      <Image
                        src={thumbnailFile.filename}
                        style={{
                          aspectRatio: '16 / 9',
                          height: '100%',
                          objectFit: 'cover',
                          width: '100%',
                        }}
                      />
                      {activeOffer !== undefined && (
                        <div className={styles.offerLabel()}>
                          <ProductOfferLabel size="base">タイムセール中</ProductOfferLabel>
                        </div>
                      )}
                    </div>
                  ) : null}
                  <div className={styles.details()}>
                    <p className={styles.itemName()}>{item.product.name}</p>
                    <p className={styles.itemPrice()}>
                      {currencyFormatter.format(price, { code: 'JPY', precision: 0 })}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className={classNames(styles.container(), {
                [styles.controller__desktop()]: deviceType === DeviceType.DESKTOP,
                [styles.controller__mobile()]: deviceType === DeviceType.MOBILE,
              })}
            >
              <label className={styles.counter()}>
                個数:
                <input
                  className={styles.counterInput()}
                  defaultValue={item.amount}
                  max={999}
                  min={1}
                  onBlur={updateCount}
                  type="number"
                />
              </label>
              <OutlineButton onClick={() => onRemove(item.product.id)} size="base">
                削除
              </OutlineButton>
            </div>
          </div>
        );
      }}
    </GetDeviceType>
  );
};
