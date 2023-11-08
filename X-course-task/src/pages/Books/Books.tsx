import { useMemo, useRef, useState } from 'react';
import { useBooksContext } from '../../contexts';
import { BookCard, Input, Select } from '../../components';

import styles from './Books.module.scss';

function Books() {
  const { books } = useBooksContext();

  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('first');

  const refSearchInput = useRef<HTMLInputElement>(null);

  const filteredBySearch = useMemo(
    () => books.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase())),
    [books, searchValue]
  );

  const optionList = useMemo(
    () => [
      {
        value: 'first',
        title: 'Any price'
      },
      {
        value: 'second',
        title: 'Up to $15'
      },
      {
        value: 'third',
        title: '$15 - $30'
      },
      {
        value: 'fourth',
        title: 'More than $30'
      }
    ],
    []
  );

  const filteredByPrice = useMemo(() => {
    switch (filterValue) {
      case 'second':
        return filteredBySearch.filter((obj) => obj.price < 15);
      case 'third':
        return filteredBySearch.filter((obj) => obj.price >= 15 && obj.price < 30);
      case 'fourth':
        return filteredBySearch.filter((obj) => obj.price >= 30);
      default:
        return filteredBySearch;
    }
  }, [filteredBySearch, filterValue]);

  return (
    <div className={styles['books']}>
      <div className={styles['control']}>
        <div className={styles['search-bar']}>
          <Input
            className={styles['input']}
            type="text"
            value={searchValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(event.target.value)
            }
            id="search-books"
            name="search-books"
            placeholder="Search book"
            refObj={refSearchInput}
          />
          <span className={styles['icon']} onClick={() => refSearchInput.current?.focus()}></span>
        </div>
        <Select
          options={optionList}
          onSelect={(value) => setFilterValue(value)}
          selectedValue={filterValue}
        />
      </div>
      <ul className={styles['list']}>
        {filteredByPrice.map((book) => (
          <li key={`book-${book.id}`}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
