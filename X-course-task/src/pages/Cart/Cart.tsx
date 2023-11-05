import { useMemo } from 'react';
import { Button } from '../../components';

import cartIcon from '../../assets/icons/cart.svg';

import styles from './Cart.module.scss';

function Cart() {
  const cartList = useMemo(() => [], []);

  return (
    <div className={styles['cart']}>
      <div className={styles['top-line']}>
        <Button>Purchase</Button>
      </div>
      <div className={styles['main-content']}>
        {cartList.length > 0 ? (
          <div>List</div>
        ) : (
          <div className={styles['empty']}>
            <img className={styles['empty-image']} src={cartIcon} alt="Cart" />
            <p className={styles['empty-text']}>Cart empty ..</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
