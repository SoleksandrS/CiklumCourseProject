import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useUserContext } from '../contexts';
import { MainLayout } from '../layouts';
import { Book, Books, Cart, NotFound, SignIn } from '../pages';

function Routing() {
  const { username } = useUserContext();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {username ? (
            <>
              <Route path="books" element={<Books />} />
              <Route path="books/:id" element={<Book />} />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              <Route path="signin" element={<SignIn />} />
              <Route path="*" element={<Navigate to="signin" />} />
            </>
          )}
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default Routing;
