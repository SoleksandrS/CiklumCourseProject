import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';

import styles from './MainLayout.module.scss';

function MainLayout() {
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
