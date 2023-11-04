import { useCallback } from 'react';
import { Button, Input } from '../../components';

import avatarIcon from '../../assets/images/avatar.png';

import styles from './SignIn.module.scss';

function SignIn() {
  const onSubmitHandler = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  }, []);

  return (
    <div className={styles['sign-in']}>
      <img className={styles['avatar']} src={avatarIcon} alt="avatar" />
      <form className={styles['form']} onSubmit={onSubmitHandler}>
        <div className={styles['row']}>
          <label className={styles['label']} htmlFor="user-name">
            Username
          </label>
          <Input
            className={styles['input']}
            type="text"
            id="user-name"
            name="user-name"
            placeholder="type Username"
          />
        </div>
        <Button type="submit" typeStyleBtn="primary">
          Sign-In
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
