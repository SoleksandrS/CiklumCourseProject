import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooksContext } from '../../contexts';
import { Button, Input } from '../../components';
import { NotFound } from '../';

import notFoundImage from '../../assets/images/imageNotFound.png';

import styles from './Book.module.scss';

function Book() {
  const { id } = useParams();
  const { books, addToCart } = useBooksContext();

  const [count, setCount] = useState(1);

  const book = useMemo(() => books.find((obj) => obj.id === +id!), [books, id]);

  const onClickHandler = useCallback(() => {
    if (book) addToCart(book.id, count);
  }, [addToCart, book, count]);

  return (
    <>
      {book ? (
        <div className={styles['book']}>
          <div className={styles['info-block']}>
            <div className={styles['top-info']}>
              <img
                src={book.image}
                alt={book.title}
                onError={(event) => {
                  const image = event.target as HTMLImageElement;
                  image.src = notFoundImage;
                  image.className = styles['not-found-image'];
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
              <Input
                className={styles['input']}
                type="number"
                min="1"
                max={book.amount}
                value={count}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCount(+event.target.value)
                }
              />
            </div>
            <div className={styles['row']}>
              <p>Total price, $</p>
              <span>{(book.price * count).toFixed(2)}</span>
            </div>
            <Button onClick={onClickHandler} className={styles['btn']} typeStyleBtn="primary">
              Add to cart
            </Button>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Book;
