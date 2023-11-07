/* eslint-disable react-refresh/only-export-components */
import React, { useContext, createContext, useState, useMemo, useCallback } from 'react';
import BookType from '../types/BookType';

import booksJSON from '../assets/data/books.json';

interface BooksContextType {
  books: BookType[];
  loadBooks: () => void;
}

const BooksContext = createContext<BooksContextType>({
  books: [],
  loadBooks: () => console.log('Load Books')
});

export const BooksProvider = (props: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<BookType[]>([]);

  const loadBooks = useCallback(() => {
    setBooks(booksJSON);
  }, []);

  const value = useMemo(
    () => ({
      books,
      loadBooks
    }),
    [books, loadBooks]
  );

  return <BooksContext.Provider value={value}>{props.children}</BooksContext.Provider>;
};

export const useBooksContext = () => {
  return useContext(BooksContext);
};
