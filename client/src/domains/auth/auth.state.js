import { createContext, useReducer, useContext } from "react";

const ACCESS_TOKEN_STORAGE = "auth";
// const BASE_URL = "http://localhost:5000"
// const BASE_URL = "https://ecomm-service.herokuapp.com"
const BASE_URL = "api";

const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE);

const AUTH_DEFAULT_STATE = storedAccessToken
  ? {
      status: "authenticated",
      accessToken: storedAccessToken,
    }
  : {
      status: "anonymous",
      accessToken: null,
    };

const AuthContext = createContext();

const authReducer = (state, event) => {
  switch (event.type) {
    case "login":
      return {
        accessToken: event.accessToken,
        status: "authenticated",
      };

    case "logout":
      return {
        accessToken: null,
        status: "anonymous",
      };

    default:
      throw new Error(`Unsupported event type ${event.type} in authReducer`);
  }
};

export const useAuthState = () => {
  const [state, dispatch] = useReducer(authReducer, AUTH_DEFAULT_STATE);

  const login = (accessToken) =>
    dispatch({
      type: "login",
      accessToken,
    });

  const logout = () =>
    dispatch({
      type: "logout",
    });

  return {
    ...state,
    login,
    logout,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthState();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return auth;
};

const login = (email, password) =>
  // fetch("https://ecomm-service.herokuapp.com/login", {
  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res)
    // throw new Error(res.statusText);
  })


const register = (username, email, password) =>
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res)
    // throw new Error(res.statusText);
  })


export const useRegister = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  // const login = useLogin();

  return function invokeRegister({ username, email, password }) {
    return register(username, email, password)          
  };
};

export const useLogin = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return function invokeLogin({ email, password }) {
    return login(email, password)
  };
};

export const useLogout = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Your application must be wrapped with AuthProvider");
  }

  return () => {
    auth.logout();
    localStorage.removeItem(ACCESS_TOKEN_STORAGE);
    localStorage.removeItem("page");
  };
};
