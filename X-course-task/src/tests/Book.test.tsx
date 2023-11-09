import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BooksContext } from '../contexts/Books.context';
import { CartContext } from '../contexts/Cart.context';
import BookComponent from '../pages/Book/Book';

const mockBooksValue = {
  books: [
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
  ],
  loadBooks: () => console.log('Load Books')
};

const mockCartValue = {
  cartList: [
    {
      id: 1,
      count: 3
    }
  ],
  loadCartList: () => console.log('Load cart'),
  addToCart: (id: number, count: number) => {
    const itemInCart = mockCartValue.cartList.find((obj) => obj.id === id);
    if (itemInCart) {
      itemInCart.count += count;
    } else {
      mockCartValue.cartList.push({ id, count });
    }
  },
  toPurchase: () => console.log('To purchase')
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' })
}));

const renderComponent = () => {
  return render(
    <BooksContext.Provider value={mockBooksValue}>
      <CartContext.Provider value={mockCartValue}>
        <MemoryRouter initialEntries={['/books/1']}>
          <Routes>
            <Route path="/books/1" element={<BookComponent />} />
          </Routes>
        </MemoryRouter>
      </CartContext.Provider>
    </BooksContext.Provider>
  );
};

describe('Book component', () => {
  test('renders BookComponent', () => {
    renderComponent();

    const titleElement = screen.getByText(mockBooksValue.books[0].title);
    const imageElement = screen.getByAltText(mockBooksValue.books[0].title);
    const descriptionElement = screen.getByText(mockBooksValue.books[0].description);

    expect(titleElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toEqual(mockBooksValue.books[0].image);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('change count via input', () => {
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
      `${Math.max(mockBooksValue.books[0].amount - mockCartValue.cartList[0].count, 1)}`
    );
    fireEvent.click(btnAddToCart);
    expect(inputCount.getAttribute('value')).toBe('1');
    expect(addedCount.textContent).toBe(`${mockBooksValue.books[0].amount}`);
  });
});
