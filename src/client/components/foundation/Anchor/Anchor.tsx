import type { FC } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import * as styles from './Anchor.styles';

type Props = LinkProps;

export const Anchor: FC<Props> = ({ children, to, ...rest }) => (
  <Link className={styles.container()} to={to} {...rest}>
    {children}
  </Link>
);
