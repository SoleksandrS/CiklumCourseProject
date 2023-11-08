import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useComponentVisible } from '../../hooks';
import { useCartContext, useUserContext } from '../../contexts';
import { Button } from '../';

import cartIcon from '../../assets/icons/cart.svg';
import avatarImage from '../../assets/images/avatar.png';

import styles from './Header.module.scss';

function Header() {
  const { cartList } = useCartContext();
  const { username, signOut } = useUserContext();
  const navigate = useNavigate();

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const allCount = useMemo(() => cartList.reduce((acc, item) => acc + item.count, 0), [cartList]);

  return (
    <header className={styles['header']}>
      <div className={styles['inner']}>
        <Link to="/books" className={styles['title']}>
          X-course task / Sitailo Oleksandr
        </Link>
        {username && (
          <div className={styles['control']}>
            <button className={styles['button-cart']} onClick={() => navigate('/cart')}>
              <img src={cartIcon} alt="cart" />
              {allCount > 0 && <span className={styles['badge']}>{allCount}</span>}
            </button>
            <div ref={ref}>
              <div
                className={`${styles['list']} ${
                  isComponentVisible ? styles['active-burger'] : ''
                }`}>
                <Button
                  onClick={() => {
                    signOut();
                    setIsComponentVisible(false);
                  }}
                  typeStyleBtn="transparent">
                  Sign out
                </Button>
                <div className={styles['user']}>
                  <img src={avatarImage} alt="avatar" className={styles['avatar']} />
                  <p className={styles['name']}>{username}</p>
                </div>
              </div>
              <Button
                className={`${styles['burger-btn']} ${
                  isComponentVisible ? styles['active-burger'] : ''
                }`}
                onClick={() => setIsComponentVisible((prev) => !prev)}
                typeStyleBtn="transparent">
                <span className={styles['line']}></span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
