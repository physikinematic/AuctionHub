import { createContext, useContext, useState } from "react";
import { api } from "../api";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const signin = (data) => {
    api.account.signIn(data).then((res) => {
      setAccount(res.data);
      return res.data;
    });
  };

  const signup = (data) => {
    api.account.signUp(data).then((res) => {
      setAccount(res.data);
      return res.data;
    });
  };

  const signout = () => {
    setAccount(null);
  };

  const isAuthenticated = () => !!account;

  return (
    <AccountContext.Provider
      value={{ account, signin, signup, signout, isAuthenticated }}
    >
      {children}
    </AccountContext.Provider>
  );
};
