import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // add case "USER_SUCCESS" here ..
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      // Set localstorage item with key "token" here ...
      localStorage.setItem(`Token`, payload.Token);
      return {
        isLogin: true,
        user: payload,
      };
    // add case "AUTH_ERROR" here ..
    case "AUTH_ERROR":
    case "LOGOUT":
      // Remove localstorage item with key "token" here ...
      localStorage.removeItem(`Token`);
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};