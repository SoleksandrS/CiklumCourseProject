/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface UserContextType {
  username: string;
  signIn: (value: string) => void;
  signOut: () => void;
}

const UserContext = createContext<UserContextType>({
  username: '',
  signIn: () => console.log('Sign in'),
  signOut: () => console.log('Sign out')
});

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [username, setUsername] = useState('');

  const signIn = useCallback((value: string) => {
    setUsername(value);
  }, []);

  const signOut = useCallback(() => {
    setUsername('');
  }, []);

  const value = useMemo(
    () => ({
      username,
      signIn,
      signOut
    }),
    [username, signIn, signOut]
  );

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
