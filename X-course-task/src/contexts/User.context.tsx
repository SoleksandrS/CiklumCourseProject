/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface UserContextType {
  username: string;
  loadUsername: () => void;
  signIn: (value: string) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType>({
  username: '',
  loadUsername: () => console.log('Load username'),
  signIn: () => console.log('Sign in'),
  signOut: () => console.log('Sign out')
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');

  const loadUsername = useCallback(() => {
    setUsername(localStorage.getItem('username') ?? '');
  }, []);

  const signIn = useCallback((value: string) => {
    setUsername(value);
    localStorage.setItem('username', value);
  }, []);

  const signOut = useCallback(() => {
    setUsername('');
    localStorage.removeItem('username');
  }, []);

  const value = useMemo(
    () => ({
      username,
      loadUsername,
      signIn,
      signOut
    }),
    [username, loadUsername, signIn, signOut]
  );

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
