import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooksContext, useCartContext } from '../../contexts';
import { Button, Input } from '../../components';
import { NotFound } from '../';

import notFoundImage from '../../assets/images/imageNotFound.png';

import styles from './Book.module.scss';

function Book() {
  const { id } = useParams();
  const { books } = useBooksContext();
  const { cartList, addToCart } = useCartContext();

  const [count, setCount] = useState(1);

  const book = useMemo(() => books.find((obj) => obj.id === +id!), [books, id]);

  const itemInCart = useMemo(() => cartList.find((obj) => obj.id === +id!), [cartList, id]);

  const isBtnDisabled = useMemo(
    () => book && itemInCart && book.amount <= itemInCart.count,
    [book, itemInCart]
  );

  const onChangeCount = useCallback(
    (value: number) => {
      if (book) {
        let subValue = book.amount;
        if (itemInCart) subValue -= itemInCart.count;
        setCount(Math.max(Math.min(value, subValue), 1));
      }
    },
    [book, itemInCart]
  );

  const onClickHandler = useCallback(() => {
    if (book) addToCart(book.id, count);
    setCount(1);
  }, [addToCart, book, count]);

  return (
    <>
      {book ? (
        <div className={styles['book']}>
          <div className={styles['info-block']}>
            <div className={styles['top-info']}>
              <img
                className={styles['image']}
                src={book.image}
                alt={book.title}
                onError={(event) => {
                  const image = event.target as HTMLImageElement;
                  image.src = notFoundImage;
                }}
              />
              <div className={styles['column']}>
                <h1 className={styles['title']}>{book.title}</h1>
                <ul className={styles['add-info-list']}>
                  <li>Author(s): {book.author}</li>
                  <li>Book level: {book.level}</li>
                  <li>Book tags: {book.tags.join(', ')}</li>
                </ul>
              </div>
            </div>
            <p className={styles['description']}>{book.description}</p>
          </div>
          <div className={styles['price-block']}>
            <div className={styles['row']}>
              <p>Price, $</p>
              <span>{book.price}</span>
            </div>
            <div className={styles['row']}>
              <p>Count</p>
              <div className={styles['input-block']}>
                <button
                  className={`${styles['btn-control']} ${styles['left']}`}
                  onClick={() => onChangeCount(count - 1)}>
                  -
                </button>
                <button
                  className={`${styles['btn-control']} ${styles['right']}`}
                  onClick={() => onChangeCount(count + 1)}>
                  +
                </button>
                <Input
                  className={styles['input']}
                  type="number"
                  value={count}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeCount(+event.target.value)
                  }
                />
              </div>
            </div>
            <div className={styles['row']}>
              <p>Total price, $</p>
              <span>{(book.price * count).toFixed(2)}</span>
            </div>
            <div className={styles['row']}>
              {itemInCart && <p>In the cart: {itemInCart.count}</p>}
              <Button
                disabled={isBtnDisabled}
                onClick={onClickHandler}
                className={styles['btn']}
                typeStyleBtn="primary"
                title={isBtnDisabled ? 'You have added the maximum quantity to your cart' : ''}>
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Book;
