import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data, success } = await api.account.getUserInfo();
      if (!success) return;
      setAccount(data);
    };

    fetchUserInfo();
  }, []);

  const signin = async (signinData) => {
    const { success, data } = await api.account.signIn(signinData);

    if (!success) return;

    setAccount(data);
    return data;
  };

  const signup = async (signupData) => {
    const { success, data } = await api.account.signUp(signupData);

    if (!success) return;

    setAccount(data);
    return data;
  };

  const signout = async () => {
    if (!account) return;

    const { success } = await api.account.signOut();

    if (!success) return;

    setAccount(null);
    return true;
  };

  const deleteAccount = async () => {
    if (!account) return;

    const { success } = await api.account.deleteAccount(account.id);

    if (!success) return;

    setAccount(null);
    return true;
  };

  const isAuthenticated = () => !!account;

  return (
    <AccountContext.Provider
      value={{
        account,
        signin,
        signup,
        signout,
        isAuthenticated,
        deleteAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
