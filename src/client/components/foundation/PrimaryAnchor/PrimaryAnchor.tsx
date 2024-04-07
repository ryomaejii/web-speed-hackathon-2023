import classNames from 'classnames';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import * as styles from './PrimaryAnchor.styles';

type Size = 'base' | 'lg';
type Props = {
  size: Size;
  href: string;
  children: string;
};

export const PrimaryAnchor: FC<Props> = ({ children, href, size }) => (
  <Link to={href}>
    <span
      className={classNames(styles.inner(), {
        [styles.container__lg()]: size === 'lg',
        [styles.container__base()]: size === 'base',
      })}
    >
      {children}
    </span>
  </Link>
);
