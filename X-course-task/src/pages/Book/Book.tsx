import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import books from '../../assets/data/books.json';
import { NotFound } from '../';

import styles from './Book.module.scss';
import { Button } from '../../components';

function Book() {
  const { id } = useParams();

  const [count, setCount] = useState(1);

  const book = useMemo(() => books.find((obj) => obj.id === +id!), [id]);

  return (
    <>
      {book ? (
        <div className={styles['book']}>
          <div className={styles['info-block']}>
            <div className={styles['row']}>
              <img src={book.image} alt={book.title} />
              <div className={styles['column']}>
                <h1 className={styles['title']}>{book.title}</h1>
                <p className={styles['paragraph']}>Author(s): {book.author}</p>
                <p className={styles['paragraph']}>Book level: {book.level}</p>
                <p className={styles['paragraph']}>Book tags: {book.tags.join(', ')}</p>
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
              <input
                type="number"
                min="1"
                max={book.amount}
                value={count}
                onChange={(event) => setCount(+event.target.value)}
              />
            </div>
            <div className={styles['row']}>
              <p>Total price, $</p>
              <span>{(book.price * count).toFixed(2)}</span>
            </div>
            <Button
              onClick={() => console.log(count)}
              className={styles['btn']}
              typeStyleBtn="primary">
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
