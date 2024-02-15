import type { FC } from 'react';

import type { FeatureSectionFragmentResponse } from '../../../graphql/fragments';
import { DeviceType, GetDeviceType } from '../../foundation/GetDeviceType';
import { ProductGridList } from '../ProductGridList';
import { ProductListSlider } from '../ProductListSlider';

type Props = {
  featureSection: FeatureSectionFragmentResponse;
};

export const ProductList: FC<Props> = ({ featureSection }) => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return <ProductListSlider featureSection={featureSection} />;
          }
          case DeviceType.MOBILE: {
            return <ProductGridList featureSection={featureSection} />;
          }
        }
      }}
    </GetDeviceType>
  );
};

export const ProductListSkelton: FC = () => {
  return (
    <GetDeviceType>
      {({ deviceType }) => {
        switch (deviceType) {
          case DeviceType.DESKTOP: {
            return (
              <div
                style={{
                  backgroundColor: '#bbb',
                  height: '206px',
                  width: '100%',
                }}
              />
            );
          }
          case DeviceType.MOBILE: {
            return (
              <div
                style={{
                  backgroundColor: '#bbb',
                  height: '240px',
                  width: '100%',
                }}
              />
            );
          }
        }
      }}
    </GetDeviceType>
  );
};
