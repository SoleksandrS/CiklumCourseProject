import { useCallback } from 'react';
import { Button } from '../../components';

import styles from './SignIn.module.scss';

function SignIn() {
  const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  }, []);

  return (
    <div className={styles['sign-in']}>
      <h1>Sign in</h1>
      <form className={styles['form']} onSubmit={onSubmitHandler}>
        <div className={styles['row']}>
          <label className={styles['label']} htmlFor="user-name">
            Username
          </label>
          <input className={styles['input']} type="text" id="user-name" name="user-name" />
        </div>
        <Button type="submit" typeStyleBtn="primary">
          Sign-In
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
