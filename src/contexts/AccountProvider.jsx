import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const useAccount = () => {
  return useContext(AccountContext);
}

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = () => !!user;

  return (
    <AccountContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AccountContext.Provider>
  );
}