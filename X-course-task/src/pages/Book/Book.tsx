import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import books from '../../assets/data/books.json';
import { NotFound } from '../';
import { Button } from '../../components';

import notFoundIcon from '../../assets/images/imageNotFound.png';

import styles from './Book.module.scss';

function Book() {
  const { id } = useParams();

  const [count, setCount] = useState(1);

  const book = useMemo(() => books.find((obj) => obj.id === +id!), [id]);

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
                  image.src = notFoundIcon;
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
              <input
                className={styles['input']}
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
