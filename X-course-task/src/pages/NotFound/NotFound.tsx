import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

import styles from './NotFound.module.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles['not-found']}>
      <h1>Not found</h1>
      <Button typeStyleBtn="primary" onClick={() => navigate('/books')}>
        Go to home
      </Button>
    </div>
  );
}

export default NotFound;
