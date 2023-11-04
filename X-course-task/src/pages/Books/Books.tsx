import books from '../../assets/data/books.json';
import { BookCard } from '../../components';

import styles from './Books.module.scss';

function Books() {
  return (
    <div className={styles['books']}>
      <h1>Books</h1>
      <ul className={styles['list']}>
        {books.map((book) => (
          <li key={`book-${book.id}`}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
