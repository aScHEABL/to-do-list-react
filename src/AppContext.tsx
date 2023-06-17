import React, { createContext, useReducer, ReactNode } from "react";

interface State {
    test: any[];
}

interface ContextValue {
    state: State;
    dispatch: React.Dispatch<any>;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState = {
  test: [],
};

const AppContext = createContext<ContextValue>({} as ContextValue);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
        test: action.payload.test,
      };
    default:
      return state;
  }
};

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
