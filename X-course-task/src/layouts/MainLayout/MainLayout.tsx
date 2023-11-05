import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { useBooksContext } from '../../contexts';

import styles from './MainLayout.module.scss';

function MainLayout() {
  const { books, loadBooks } = useBooksContext();
  useEffect(() => console.log(books), [books]);

  useEffect(() => loadBooks(), [loadBooks]);

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
