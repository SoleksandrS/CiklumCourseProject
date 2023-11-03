import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

import styles from './NotFound.module.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found']}>
      <div className={styles['block']}>
        <h1 className={styles['title']}>Oops, something went wrong</h1>
        <Button typeStyleBtn="primary" onClick={() => navigate('/books')}>
          Go to home
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
