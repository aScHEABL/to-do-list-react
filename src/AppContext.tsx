import React, { createContext, useReducer, ReactNode } from "react";
import { v4 as uuid } from 'uuid';

interface State {
    toDoList: { id: string; title: string, content: string }[];
    inProgressList: any[];
    completedList: any[];
}

interface ContextValue {
    state: State;
    dispatch: React.Dispatch<any>;
}

interface Action {
    type: string;
    payload?: any;
}

const initialState: State = {
  toDoList: [{
     id: uuid(), title: "Read work emails", content: "" 
    }, 
    { id: uuid(), title: "Walmart shopping", content: "" 
    }],
  inProgressList: [],
  completedList: []
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
