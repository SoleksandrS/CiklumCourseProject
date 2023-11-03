import books from '../../assets/data/books.json';

function Books() {
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={`book-${book.id}`}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
