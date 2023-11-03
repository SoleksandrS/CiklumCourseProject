import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { Book, Books, Cart, NotFound, SignIn } from '../pages';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<Book />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
