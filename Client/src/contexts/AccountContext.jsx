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
      try {
        const { data, success, message } = await api.account.getUserInfo();
        if (!success) throw new Error(message);
        setAccount(data);
      } catch {}
    };

    fetchUserInfo();
  }, []);

  const signin = async (signinData) => {
    try {
      const { success, data, message } = await api.account.signIn(signinData);

      if (!success) throw new Error(message);

      setAccount(data);
      return data;
    } catch (error) {
      setError("Unable to sign in", error.message);
      return;
    }
  };

  const signup = async (signupData) => {
    try {
      const { success, data, message } = await api.account.signUp(signupData);

      if (!success) throw new Error(message);

      setAccount(data);
      return data;
    } catch (error) {
      setError("Unable to sign up", error.message);
      return;
    }
  };

  const signout = async () => {
    try {
      if (!account) throw new Error("Account not signed in");

      const { success, message } = await api.account.signOut();

      if (!success) throw new Error(message);

      setAccount(null);
      return true;
    } catch (error) {
      setError("Unable to sign out", error.message);
      return;
    }
  };

  const deleteAccount = async () => {
    try {
      if (!account) throw new Error("Account not signed in");

      const { success, message } = await api.account.deleteAccount(account.id);

      if (!success) throw new Error(message);

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
