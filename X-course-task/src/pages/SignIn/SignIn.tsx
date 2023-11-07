import { useCallback, useMemo, useState } from 'react';
import { useUserContext } from '../../contexts';
import { Button, Input } from '../../components';

import avatarImage from '../../assets/images/avatar.png';

import styles from './SignIn.module.scss';

function SignIn() {
  const { signIn } = useUserContext();

  const [inputValue, setInputValue] = useState('');

  const isValidValue = useMemo(
    () => inputValue.length >= 4 && inputValue.length <= 16,
    [inputValue]
  );

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      signIn(inputValue);
    },
    [inputValue, signIn]
  );

  return (
    <div className={styles['sign-in']}>
      <img className={styles['avatar']} src={avatarImage} alt="avatar" />
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
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </div>
        <Button
          disabled={!isValidValue}
          type="submit"
          typeStyleBtn="primary"
          className={styles['btn']}>
          Sign-In
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
