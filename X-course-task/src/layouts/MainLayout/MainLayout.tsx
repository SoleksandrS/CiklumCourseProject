import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { useBooksContext, useCartContext, useUserContext } from '../../contexts';

import styles from './MainLayout.module.scss';

function MainLayout() {
  const { loadBooks } = useBooksContext();
  const { loadCartList } = useCartContext();
  const { username } = useUserContext();

  useEffect(() => console.log(username), [username]);

  useEffect(() => {
    loadBooks();
    loadCartList();
  }, [loadBooks, loadCartList]);

  return (
    <div className={styles['main-layout']}>
      <Header />
      <main className={styles['main']}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
