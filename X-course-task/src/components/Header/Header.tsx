import { Link } from 'react-router-dom';
import { Button } from '../';

import cartIcon from '../../assets/icons/cart.svg';
import avatarIcon from '../../assets/images/avatar.png';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['inner']}>
        <Link to="/books" className={styles['title']}>
          X-course task / Sitailo Oleksandr
        </Link>
        <div className={styles['control']}>
          <button className={styles['button-cart']}>
            <img src={cartIcon} alt="cart" />
          </button>
          <Button onClick={() => console.log('Sign out')} typeStyleBtn="transparent">
            Sign out
          </Button>
          <div className={styles['user']}>
            <img src={avatarIcon} alt="avatar" className={styles['avatar']} />
            <p className={styles['name']}>Username</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
