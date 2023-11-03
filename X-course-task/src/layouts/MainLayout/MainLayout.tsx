import { Outlet } from 'react-router-dom';
import { Footer } from '../../components';

import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <div className={styles['main-layout']}>
      <h1>Header</h1>
      <main className={styles['main']}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
