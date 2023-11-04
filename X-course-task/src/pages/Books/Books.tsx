import { useMemo, useRef, useState } from 'react';
import books from '../../assets/data/books.json';
import { BookCard, Input, Select } from '../../components';
import BookType from '../../types/BookType';

import styles from './Books.module.scss';

function Books() {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState('');

  const refSearchInput = useRef<HTMLInputElement>(null);

  const filteredList = useMemo(
    () => books.filter((book) => book.title.toLowerCase().includes(searchValue.toLowerCase())),
    [searchValue]
  );

  const optionList = useMemo(
    () => [
      {
        value: 'title-asc',
        title: 'Title ASC'
      },
      {
        value: 'title-desc',
        title: 'Title DESC'
      },
      {
        value: 'price-asc',
        title: 'Price ASC'
      },
      {
        value: 'price-desc',
        title: 'Price DESC'
      }
    ],
    []
  );

  const sortedList = useMemo(() => {
    if (sortValue === '') return filteredList;
    const [value, order] = sortValue.split('-');

    if (order === 'desc') {
      return filteredList.sort((a, b) =>
        a[value as keyof BookType] < b[value as keyof BookType] ? 1 : -1
      );
    } else {
      return filteredList.sort((a, b) =>
        a[value as keyof BookType] > b[value as keyof BookType] ? 1 : -1
      );
    }
  }, [filteredList, sortValue]);

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
          onSelect={(value) => setSortValue(value)}
          selectedValue={sortValue}
          placeholder="Sort by"
        />
      </div>
      <ul className={styles['list']}>
        {sortedList.map((book) => (
          <li key={`book-${book.id}`}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
