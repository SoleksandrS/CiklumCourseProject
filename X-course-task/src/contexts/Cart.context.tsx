/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import BookType from '../types/BookType';

type CartItemType = {
  id: BookType['id'];
  count: number;
};

export interface CartContextType {
  cartList: CartItemType[];
  loadCartList: () => void;
  addToCart: (id: CartItemType['id'], count: CartItemType['count']) => void;
  toPurchase: () => void;
}

export const CartContext = createContext<CartContextType>({
  cartList: [],
  loadCartList: () => console.log('Load cart'),
  addToCart: () => console.log('Add to cart'),
  toPurchase: () => console.log('To purchase')
});

export const CartProvider = (props: { children: React.ReactNode }) => {
  const [cartList, setCartList] = useState<CartItemType[]>([]);

  const loadCartList = useCallback(() => {
    const arr = JSON.parse(localStorage.getItem('cart-list') ?? '[]');
    setCartList(arr);
  }, []);

  const addToCart = useCallback(
    (id: CartItemType['id'], count: CartItemType['count']) => {
      let newArr = JSON.parse(JSON.stringify(cartList)) as CartItemType[];
      const itemInCart = newArr.find((obj) => obj.id === id);
      if (itemInCart) {
        itemInCart.count += count;
      } else {
        newArr = newArr.concat([{ id, count }]);
      }
      setCartList(newArr);
      localStorage.setItem('cart-list', JSON.stringify(newArr));
    },
    [cartList]
  );

  const toPurchase = useCallback(() => {
    setCartList([]);
    localStorage.removeItem('cart-list');
  }, []);

  const value = useMemo(
    () => ({
      cartList,
      loadCartList,
      addToCart,
      toPurchase
    }),
    [cartList, loadCartList, addToCart, toPurchase]
  );

  return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
