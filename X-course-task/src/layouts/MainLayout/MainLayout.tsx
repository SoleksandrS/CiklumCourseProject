import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
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
    setIsLoading(false);
  }, [loadBooks, loadCartList, loadUsername]);

  return (
    <div className={styles['main-layout']}>
      <Header />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <main className={styles['main']}>
          <Outlet />
        </main>
      )}
      <Footer />
    </div>
  );
}

export default MainLayout;
