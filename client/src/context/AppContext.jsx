import { createContext } from "react";

export const AppContext = createContext();

const value = {
  
}
export const AppProvider = (props)=> {
  return (
    <AppContext.Provider value={{}}>
      {props.children}
    </AppContext.Provider>
  );
}