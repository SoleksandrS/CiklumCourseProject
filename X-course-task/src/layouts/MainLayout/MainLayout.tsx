import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Loader } from '../../components';
import { useBooksContext, useCartContext, useUserContext } from '../../contexts';

import styles from './MainLayout.module.scss';

function MainLayout() {
  const { loadBooks } = useBooksContext();
  const { loadCartList } = useCartContext();
  const { loadUsername } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadBooks();
    loadCartList();
    loadUsername();
    setTimeout(() => setIsLoading(false), 500);
  }, [loadBooks, loadCartList, loadUsername]);

  return (
    <div className={styles['main-layout']}>
      <Header />
      <main className={styles['main']}>
        {isLoading ? (
          <div className={styles['loader-block']}>
            <Loader size="large" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
