import classNames from 'classnames';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '../../components/application/Layout';
import { DeviceType, GetDeviceType } from '../../components/foundation/GetDeviceType';
import { PrimaryAnchor } from '../../components/foundation/PrimaryAnchor';
import { ProductHeroImage } from '../../components/product/ProductHeroImage';
import { useAuthUser } from '../../hooks/useAuthUser';
import { useRecommendation } from '../../hooks/useRecommendation';
import { loadFonts } from '../../utils/load_fonts';

import * as styles from './OrderComplete.styles';

export const OrderComplete: FC = () => {
  const navigate = useNavigate();
  const [isReadyFont, setIsReadyFont] = useState(false);
  const { authUserLoading, isAuthUser } = useAuthUser();
  const { recommendation } = useRecommendation();

  useEffect(() => {
    loadFonts().then(() => {
      setIsReadyFont(true);
    });
  }, []);

  if (!recommendation || !isReadyFont || authUserLoading) {
    return null;
  }
  if (!isAuthUser) {
    navigate('/');
    return null;
  }

  document.title = '購入が完了しました';

  return (
    <Layout>
      <GetDeviceType>
        {({ deviceType }) => (
          <div
            style={{
              margin: '0 auto',
              maxWidth: '1024px',
              padding: '0 16px',
              width: '100%',
            }}
          >
            <div className={styles.container()}>
              <div className={styles.notice()}>
                <h2 className={styles.noticeHeading()}>購入が完了しました</h2>
                <div className={styles.noticeDescriptionWrapper()}>
                  <p
                    className={classNames(styles.noticeDescription(), {
                      [styles.noticeDescription__desktop()]: deviceType === DeviceType.DESKTOP,
                      [styles.noticeDescription__mobile()]: deviceType === DeviceType.MOBILE,
                    })}
                  >
                    このサイトは架空のサイトであり、商品が発送されることはありません
                  </p>
                </div>
              </div>

              <div className={styles.recommended()}>
                <h2 className={styles.recommendedHeading()}>こちらの商品もオススメです</h2>
                <ProductHeroImage product={recommendation.product} title={recommendation.product.name} />
              </div>

              <div className={styles.backToTopButtonWrapper()}>
                <PrimaryAnchor href="/" size="lg">
                  トップへ戻る
                </PrimaryAnchor>
              </div>
            </div>
          </div>
        )}
      </GetDeviceType>
    </Layout>
  );
};
