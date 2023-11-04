import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../';
import BookType from '../../types/BookType';

import notFoundImage from '../../assets/images/imageNotFound.png';

import styles from './BookCard.module.scss';

interface BookCardProps {
  book: BookType;
}

function BookCard(props: BookCardProps) {
  const { book } = props;
  const navigate = useNavigate();

  return (
    <div className={styles['book-card']}>
      <Link to={`/books/${book.id}`} className={styles['image-block']}>
        <img
          className={styles['image']}
          src={book.image}
          alt={book.title}
          onError={(event) => {
            const image = event.target as HTMLImageElement;
            image.src = notFoundImage;
          }}
        />
      </Link>
      <div className={styles['info-block']}>
        <h5 className={styles['title']}>{book.title}</h5>
        <p className={styles['author']}>{book.author}</p>
        <div className={styles['row']}>
          <p className={styles['price']}>${book.price}</p>
          <Button onClick={() => navigate(`/books/${book.id}`)} typeStyleBtn="transparent">
            View
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
