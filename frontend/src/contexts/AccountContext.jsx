import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";
import { useError } from "./ErrorContext";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
};

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const { setError } = useError();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data, success } = await api.account.getUserInfo();
      if (!success) return;
      setAccount(data);
    };

    try {
      fetchUserInfo();
    } catch (error) {
      setError("Unable to fetch user info", error.message);
    }
  }, []);

  const signin = async (signinData) => {
    try {
      const { success, data } = await api.account.signIn(signinData);

      if (!success) return;

      setAccount(data);
      return data;
    } catch (error) {
      setError("Unable to sign in", error.message);
      return;
    }
  };

  const signup = async (signupData) => {
    try {
      const { success, data } = await api.account.signUp(signupData);

      if (!success) return;

      setAccount(data);
      return data;
    } catch (error) {
      setError("Unable to sign up", error.message);
      return;
    }
  };

  const signout = async () => {
    try {
      if (!account) return;

      const { success } = await api.account.signOut();

      if (!success) return;

      setAccount(null);
      return true;
    } catch (error) {
      setError("Unable to sign out", error.message);
      return;
    }
  };

  const deleteAccount = async () => {
    try {
      if (!account) return;

      const { success } = await api.account.deleteAccount(account.id);

      if (!success) return;

      setAccount(null);
      return true;
    } catch (error) {
      setError("Unable to delete account", error.message);
      return;
    }
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
