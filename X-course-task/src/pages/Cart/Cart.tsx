import { useMemo } from 'react';
import { useBooksContext } from '../../contexts';
import { Button } from '../../components';

import cartIcon from '../../assets/icons/cart.svg';

import styles from './Cart.module.scss';

function Cart() {
  const { books, cartList, toPurchase } = useBooksContext();

  const displayList = useMemo(() => {
    return cartList.map((item) => {
      const book = books.find((book) => book.id === item.id);
      return {
        ...item,
        title: book?.title,
        price: book?.price ?? 0
      };
    });
  }, [books, cartList]);

  const allSum = useMemo(
    () => displayList.reduce((acc, item) => acc + item.count * item.price, 0),
    [displayList]
  );

  return (
    <div className={styles['cart']}>
      <div className={styles['top-line']}>
        <Button disabled={cartList.length <= 0} typeStyleBtn="success" onClick={toPurchase}>
          Purchase
        </Button>
      </div>
      <div className={styles['main-content']}>
        {cartList.length > 0 ? (
          <>
            <ul className={styles['list']}>
              {displayList.map((item) => (
                <li className={styles['item']} key={`cart-item-${item.id}`}>
                  <p className={styles['title']}>{item.title}</p>
                  <p className={styles['count']}>{item.count}</p>
                  <p className={styles['price']}>{item.price * item.count}</p>
                </li>
              ))}
            </ul>
            <div className={styles['total']}>Total price, $ {allSum.toFixed(2)}</div>
          </>
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
