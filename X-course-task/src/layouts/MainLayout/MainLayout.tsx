import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';

function MainLayout() {
  return (
    <div className={styles['main-layout']}>
      <h1>Header</h1>
      <main className={styles['main']}>
        <Outlet />
      </main>
      <h1>Footer</h1>
    </div>
  );
}

export default MainLayout;
