import { ReactNode, createContext, useContext } from "react";

type AuthContextProps = {
  hasSession: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({
  children,
  hasSession,
}: {
  children: ReactNode;
  hasSession: boolean;
}) => {
  return (
    <AuthContext.Provider value={{ hasSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
