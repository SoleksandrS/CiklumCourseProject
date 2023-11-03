import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<h1>Sign in</h1>} />
        <Route path="books" element={<h1>Books</h1>} />
        <Route path="books/:id" element={<h1>Books/id</h1>} />
        <Route path="cart" element={<h1>Cart</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
