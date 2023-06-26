import React, { createContext, useReducer, ReactNode } from "react";
import { v4 as uuid } from 'uuid';

interface State {
  [key: string]: { title: string, items: {}[] }
}

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}

interface Action {
  type: string;
  payload?: any;
}

const init_items = [
  { id: uuid(), title: "Read work emails" },
  { id: uuid(), title: "Take out the trash" },
  { id: uuid(), title: "File taxes" },
  { id: uuid(), title: "Workout" },
  { id: uuid(), title: "Call Amy" }
]

const initialState: State = {
  [uuid()]: {
    title: "Todo",
    items: init_items
  },
  [uuid()]: {
    title: "In Progress",
    items: []
  },
  [uuid()]: {
    title: "Completed",
    items: []
  }
}

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
}

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