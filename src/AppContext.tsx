import React, { createContext, useReducer, ReactNode, useState } from "react";
import { v4 as uuid } from 'uuid';

interface Item {
  id: string;
  title: string;
  category: string;
  dueDate: any;
  priority: string;
}
interface State {
  columns: {
    [key: string]: { title: string, items: Item[] }
  }
}

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<any>;
}

interface Action {
  type: string;
  payload?: any;
}


const init_items: Item[] = [
  { id: uuid(), title: "Read work emails", category: "work", dueDate: "2023-06-23", priority: "medium" },
  { id: uuid(), title: "Take out the trash", category: "personal",dueDate: "2023-05-15", priority: "medium" },
  { id: uuid(), title: "File taxes", category: "personal",dueDate: "2023-06-28", priority: "medium" },
  { id: uuid(), title: "Workout", category: "personal", dueDate: "2023-07-18", priority: "medium" },
  { id: uuid(), title: "Call Amy", category:"education", dueDate: "2023-08-30", priority: "medium" }
]

const initialState: State = {
  columns: {
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
}

const AppContext = createContext<ContextValue>({} as ContextValue);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_COLUMNS":
      return {
        ...state,
        columns: {
          ...state.columns,
          ...action.payload
        }
      }
    case 'SET_STATE':
      return action.payload;
    case 'ADD_TASK':
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.columnID]: {
            ...state.columns[action.payload.columnID],
            items: [
              ...state.columns[action.payload.columnID].items,
              action.payload.newTask
            ]
          }
        }
      }
    case 'EDIT_TASK':
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.columnId]: {
            ...state.columns[action.payload.columnId],
            items: state.columns[action.payload.columnId].items.map(item =>
              item.id === action.payload.taskId ? action.payload.updatedTask : item
            )
          }
        }
      }
    case 'DELETE_TASK':
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.columnId]: {
            ...state.columns[action.payload.columnId],
            items: state.columns[action.payload.columnId].items.filter(
              item => item.id !== action.payload.taskId
            )
          }
        }
      }
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