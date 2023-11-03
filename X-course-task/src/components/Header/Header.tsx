import cartIcon from '../../assets/images/cart.svg';
import avatarIcon from '../../assets/images/avatar.png';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['inner']}>
        <h1 className={styles['title']}>X-course task / Sitailo Oleksandr</h1>
        <div className={styles['control']}>
          <button className={styles['button-cart']}>
            <img src={cartIcon} alt="cart" />
          </button>
          <button>Sign out</button>
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
