import React, { createContext, ReactNode, useContext, useReducer } from "react";

import { useStorageState } from "./useStorageState";

enum AuthActionKind {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

interface AuthContextState {
  signedIn: boolean;
  session?: string | null;
  isLoading: boolean;
}

interface AuthContextType {
  // state: AuthContextState;
  // dispatch: (action: AuthAction) => void;
}

interface AuthAction {
  type: AuthActionKind;
  payload: number;
}

const initialState: AuthContextState = {
  signedIn: false,
  session: null,
  isLoading: false,
};

const SessionContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  /* state: initialState,
  dispatch: () => null, */
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

/* const authReducer = (state: AuthContextState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionKind.SIGN_IN:
      return {
        ...state,
        signedIn: true,
      };
    case AuthActionKind.SIGN_OUT:
      return {
        ...state,
        signedIn: false,
      };
    default:
      return state;
  }
}; */

type AuthProviderProps = {
  children?: ReactNode;
};

export const SessionProvider = ({ children }: AuthProviderProps) => {
  // const [state, dispatch] = useReducer(authReducer, initialState);
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <SessionContext.Provider
      value={{
        signIn: (token: string) => {
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const value = useContext(SessionContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
};
