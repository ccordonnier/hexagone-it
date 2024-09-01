import { createContext, useState } from "react";

//Création du contexte
export const AuthContext = createContext(null);

//Provider du contexte
export const AuthProvider = ({ children }) => {
  const [authContext, setAuthContext] = useState(JSON.parse(localStorage.getItem("userAcess")) ?? null);

  return (
    <AuthContext.Provider value={{ authContext, setAuthContext }} >
      {children}
    </AuthContext.Provider>
  );
};
