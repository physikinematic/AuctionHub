import { createContext, useContext, useState } from "react";
import { api } from "../api";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const signin = async (data) => {
    const response = await api.account.signIn(data);
    if (response.success) setAccount(response.data);
  };

  const signup = async (data) => {
    const response = await api.account.signUp(data);
    if (response.success) setAccount(response.data);
  };

  const signout = async () => {
    if (!account) return;
    const response = await api.account.signOut();
    if (response.success) setAccount(null);
  };

  const deleteAccount = async () => {
    if (!account) return;
    const response = await api.account.deleteAccount(account.id);
    if (response.success) setAccount(null);
  };

  const isAuthenticated = () => account !== null && account !== undefined;

  return (
    <AccountContext.Provider
      value={{ account, signin, signup, signout, isAuthenticated, deleteAccount }}
    >
      {children}
    </AccountContext.Provider>
  );
};
