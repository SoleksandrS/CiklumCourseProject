import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts';
import { Button, Input } from '../../components';

import avatarImage from '../../assets/images/avatar.png';

import styles from './SignIn.module.scss';

function SignIn() {
  const { signIn } = useUserContext();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  const isValidValue = useMemo(
    () => inputValue.length >= 4 && inputValue.length <= 16,
    [inputValue]
  );

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      signIn(inputValue);
      navigate('/books');
    },
    [inputValue, navigate, signIn]
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
          {inputValue.length > 0 && !isValidValue && (
            <p className={styles['error']}>
              The username must be more than 3 and less than 17 characters.
            </p>
          )}
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
