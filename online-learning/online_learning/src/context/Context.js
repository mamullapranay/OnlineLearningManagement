import { createContext, useEffect, useReducer, useState } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  isChecked : true
};

export const Context = createContext(INITIAL_STATE);

//children are components which can provide the context
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);


  useEffect(() => {
    console.log(state.user);
    if (state.isChecked) {
      localStorage.setItem("user", JSON.stringify(state.user)); //saving user in local storage of browser
    }
    
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};