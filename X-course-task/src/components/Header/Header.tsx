import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooksContext } from '../../contexts';
import { Button } from '../';

import cartIcon from '../../assets/icons/cart.svg';
import avatarImage from '../../assets/images/avatar.png';

import styles from './Header.module.scss';

function Header() {
  const { cartList } = useBooksContext();
  const navigate = useNavigate();

  const allCount = useMemo(() => cartList.reduce((acc, item) => acc + item.count, 0), [cartList]);

  return (
    <header className={styles['header']}>
      <div className={styles['inner']}>
        <Link to="/books" className={styles['title']}>
          X-course task / Sitailo Oleksandr
        </Link>
        <div className={styles['control']}>
          <button className={styles['button-cart']} onClick={() => navigate('/cart')}>
            <img src={cartIcon} alt="cart" />
            {allCount > 0 && <span className={styles['badge']}>{allCount}</span>}
          </button>
          <Button onClick={() => console.log('Sign out')} typeStyleBtn="transparent">
            Sign out
          </Button>
          <div className={styles['user']}>
            <img src={avatarImage} alt="avatar" className={styles['avatar']} />
            <p className={styles['name']}>Username</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
