/* eslint-disable react-refresh/only-export-components */
import React, { useContext, createContext, useState, useMemo, useCallback } from 'react';
import BookType from '../types/BookType';

import booksJSON from '../assets/data/books.json';

type CartItem = {
  id: BookType['id'];
  count: number;
};

interface BooksContextType {
  books: BookType[];
  loadBooks: () => void;
  cartList: CartItem[];
  addToCart: (id: CartItem['id'], count: CartItem['count']) => void;
}

const BooksContext = createContext<BooksContextType>({
  books: [],
  loadBooks: () => console.log('Load Books'),
  cartList: [],
  addToCart: () => console.log('Add to cart')
});

export const BooksProvider = (props: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [cartList, setCartList] = useState<CartItem[]>([]);

  const loadBooks = useCallback(() => {
    setBooks(booksJSON);
  }, []);

  const addToCart = useCallback((id: CartItem['id'], count: CartItem['count']) => {
    setCartList((prev) => prev.concat([{ id, count }]));
  }, []);

  const value = useMemo(
    () => ({
      books,
      loadBooks,
      cartList,
      addToCart
    }),
    [books, loadBooks, cartList, addToCart]
  );

  return <BooksContext.Provider value={value}>{props.children}</BooksContext.Provider>;
};

export const useBooksContext = () => {
  return useContext(BooksContext);
};
