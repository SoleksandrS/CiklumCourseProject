import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as BooksContext from '../contexts/Books.context';
import * as CartContext from '../contexts/Cart.context';
import { CartContextType } from '../contexts/Cart.context';
import BookComponent from '../pages/Book/Book';

const books = [
  {
    id: 1,
    author: 'David Flanagan',
    price: 10.99,
    image:
      'https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg',
    title: 'JavaScript: The Definitive Guide, 7th Edition',
    level: 'Beginner',
    tags: ['core', 'frontend', 'javascript'],
    amount: 42,
    shortDescription:
      'JavaScript is the programming language of the web and is used by more software developers today than any other programming language.',
    description:
      'JavaScript is the programming language of the web and is used by more software developers today than any other programming language. For nearly 25 years this best seller has been the go-to guide for JavaScript programmers. The seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover classes, modules, iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and engaging example code throughout. This book is for programmers who want to learn JavaScript and for web developers who want to take their understanding and mastery to the next level. It begins by explaining the JavaScript language itself, in detail, from the bottom up. It then builds on that foundation to cover the web platform and Node.js.'
  }
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' })
}));
jest.mock('../contexts/Books.context', () => ({
  ...jest.requireActual('../contexts/Books.context'),
  useBooksContext: jest.fn()
}));
jest.mock('../contexts/Cart.context', () => ({
  ...jest.requireActual('../contexts/Cart.context'),
  useCartContext: jest.fn()
}));

const renderComponent = () => {
  return render(<BookComponent />);
};

describe('Book component', () => {
  let mockCartValue: CartContextType;

  beforeEach(() => {
    mockCartValue = {
      cartList: [],
      addToCart: jest.fn().mockImplementation((id: number, count: number) => {
        const itemInCart = mockCartValue.cartList.find((obj) => obj.id === id);
        if (itemInCart) {
          itemInCart.count += count;
        } else {
          mockCartValue.cartList.push({ id, count });
        }
      }),
      loadCartList: jest.fn(),
      toPurchase: jest.fn()
    };
  });

  test('renders BookComponent', () => {
    jest.spyOn(BooksContext, 'useBooksContext').mockReturnValue({ books, loadBooks: () => 1 });
    jest.spyOn(CartContext, 'useCartContext').mockReturnValue(mockCartValue);

    renderComponent();

    const titleElement = screen.getByText(books[0].title);
    const imageElement = screen.getByAltText(books[0].title);
    const descriptionElement = screen.getByText(books[0].description);

    expect(titleElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toEqual(books[0].image);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('change count via input', () => {
    jest.spyOn(BooksContext, 'useBooksContext').mockReturnValue({ books, loadBooks: () => 1 });
    jest.spyOn(CartContext, 'useCartContext').mockReturnValue(mockCartValue);

    renderComponent();

    const values = [5, 8, 10, 14, 23, 25];

    const inputCount = screen.getByTestId('input-count');

    values.forEach((value) => {
      fireEvent.change(inputCount, {
        target: {
          value
        }
      });
      expect(inputCount.getAttribute('value')).toBe(`${value}`);
    });
  });

  test('change count via btn minus', () => {
    jest.spyOn(BooksContext, 'useBooksContext').mockReturnValue({ books, loadBooks: () => 1 });
    jest.spyOn(CartContext, 'useCartContext').mockReturnValue(mockCartValue);

    renderComponent();

    const values = [7, 13, 18, 22, 25, 28];

    const inputCount = screen.getByTestId('input-count');
    const btnMinusCount = screen.getByTestId('btn-minus-count');

    values.forEach((value) => {
      fireEvent.change(inputCount, {
        target: {
          value
        }
      });
      fireEvent.click(btnMinusCount);
      expect(inputCount.getAttribute('value')).toBe(`${value - 1}`);
    });
  });

  test('change count via btn add', () => {
    jest.spyOn(BooksContext, 'useBooksContext').mockReturnValue({ books, loadBooks: () => 1 });
    jest.spyOn(CartContext, 'useCartContext').mockReturnValue(mockCartValue);

    renderComponent();

    const values = [4, 5, 14, 20, 21, 26];

    const inputCount = screen.getByTestId('input-count');
    const btnAddCount = screen.getByTestId('btn-add-count');

    values.forEach((value) => {
      fireEvent.change(inputCount, {
        target: {
          value
        }
      });
      fireEvent.click(btnAddCount);
      expect(inputCount.getAttribute('value')).toBe(`${value + 1}`);
    });
  });

  test('add to cart', async () => {
    mockCartValue.cartList = [{ id: 1, count: 3 }];
    jest.spyOn(BooksContext, 'useBooksContext').mockReturnValue({ books, loadBooks: () => 1 });
    jest.spyOn(CartContext, 'useCartContext').mockReturnValue(mockCartValue);

    renderComponent();

    const inputCount = screen.getByTestId('input-count');
    const btnAddToCart = screen.getByTestId('btn-add-to-cart');
    const addedCount = screen.getByTestId('added-in-cart');

    expect(addedCount.textContent).toBe('3');
    fireEvent.change(inputCount, {
      target: {
        value: '35'
      }
    });
    fireEvent.click(btnAddToCart);
    expect(inputCount.getAttribute('value')).toBe('1');
    expect(addedCount.textContent).toBe('38');

    fireEvent.change(inputCount, {
      target: {
        value: '100'
      }
    });
    expect(inputCount.getAttribute('value')).toBe(
      `${Math.max(books[0].amount - mockCartValue.cartList[0].count, 1)}`
    );
    fireEvent.click(btnAddToCart);
    expect(inputCount.getAttribute('value')).toBe('1');
    expect(addedCount.textContent).toBe(`${books[0].amount}`);
  });
});
