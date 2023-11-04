import { useMemo, useRef, useState } from 'react';
import books from '../../assets/data/books.json';
import { BookCard } from '../../components';

import styles from './Books.module.scss';

function Books() {
  const [searchValue, setSearchValue] = useState('');

  const refSearchInput = useRef<HTMLInputElement>(null);

  const booksList = useMemo(
    () => books.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue]
  );

  return (
    <div className={styles['books']}>
      <div className={styles['control']}>
        <div className={styles['search-bar']}>
          <input
            className={styles['input']}
            type="text"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            id="search-books"
            name="search-books"
            placeholder="Search book"
            ref={refSearchInput}
          />
          <span className={styles['icon']} onClick={() => refSearchInput.current?.focus()}></span>
        </div>
        <select onChange={(event) => console.log(event.target.value)}>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>
      </div>
      <ul className={styles['list']}>
        {booksList.map((book) => (
          <li key={`book-${book.id}`}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
