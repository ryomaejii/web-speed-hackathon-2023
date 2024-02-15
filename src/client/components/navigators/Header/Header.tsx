import type { FC } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

import { useAuthUser } from '../../../hooks/useAuthUser';
import { useOpenModal } from '../../../store/modal';
import { Anchor } from '../../foundation/Anchor';

import * as styles from './Header.styles';

export const Header: FC = () => {
  const { isAuthUser } = useAuthUser();
  const handleOpenModal = useOpenModal();

  return (
    <header className={styles.container()}>
      <Anchor to="/">
        <img alt="logo" height={32} src="/icons/logo.svg" width={205} />
      </Anchor>
      {isAuthUser ? (
        <Anchor data-testid="navigate-order" to={'/order'}>
          <div className={styles.orderLink()}>
            <FaShoppingCart color="#222222" size={20} />
          </div>
        </Anchor>
      ) : (
        <button
          className={styles.signInButton()}
          data-testid="navigate-signin"
          onClick={() => handleOpenModal('SIGN_IN')}
        >
          <FaUser color="#222222" size={20} />
        </button>
      )}
    </header>
  );
};
