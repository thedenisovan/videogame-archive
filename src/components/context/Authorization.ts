import { createContext } from 'react';

const AuthorizationContext = createContext({
  isLoggedIn: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLoggedIn: (_bool: boolean) => {},
});

export default AuthorizationContext;
