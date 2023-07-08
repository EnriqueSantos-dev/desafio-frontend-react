import { useAlertExpiredSessionStore } from "@/hooks/useAlertExpiredSessionStore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";

type AuthContextProps = {
  hasSession: boolean;
  hasCookieSession: boolean;
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthContextProvider = ({
  children,
  values,
}: {
  children: ReactNode;
  values: { hasSession: boolean; hasCookieSession: boolean };
}) => {
  const setIsExpiredSession = useAlertExpiredSessionStore(
    (state) => state.setIsExpired
  );

  useEffect(() => {
    if (values.hasCookieSession && !values.hasSession) {
      setIsExpiredSession(true);
    }
  }, [values.hasCookieSession, values.hasSession, setIsExpiredSession]);

  const valuesMemo = useMemo(() => values, [values]);

  return (
    <AuthContext.Provider value={valuesMemo}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
