import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { useAlertExpiredSessionStore } from "@/hooks/useAlertExpiredSessionStore";
import { SessionData } from "@/types";

export type AuthContextType = {
  hasSession: boolean;
  hasCookieSession: boolean;
  sessionData: SessionData | null;
};

export type AuthContextProps = {
  hasCookieSession: boolean;
  sessionData: SessionData | null;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({
  children,
  values,
}: {
  children: ReactNode;
  values: AuthContextProps;
}) => {
  const setIsExpiredSession = useAlertExpiredSessionStore(
    (state) => state.setIsExpired
  );

  useEffect(() => {
    if (values.hasCookieSession && !values.sessionData) {
      setIsExpiredSession(true);
    }
  }, [values.hasCookieSession, values.sessionData, setIsExpiredSession]);

  const valuesMemo = useMemo(
    () => ({ ...values, hasSession: !!values.sessionData }),
    [values]
  );

  return (
    <AuthContext.Provider value={valuesMemo}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
