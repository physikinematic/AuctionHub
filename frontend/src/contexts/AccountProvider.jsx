import { createContext, useContext, useState } from "react";
import { api } from "../api";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
}

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signin = (data) => {
    api.user.signIn(data).then((res) => {
      setUser(res)
      return user;
    });
  };

  const signup = (data) => {
    const newUser = 'addUser(data)';
    setUser(newUser);
  };

  const signout = () => {
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AccountContext.Provider value={{ user, signin, signup, signout, isAuthenticated }}>
      {children}
    </AccountContext.Provider>
  );
}