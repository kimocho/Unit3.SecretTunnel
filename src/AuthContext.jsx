import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [userNameInput, setUserNameInput] = useState('');

  // TODO: signup
  const signup = async () => {
    const response = await fetch(`${API}/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: userNameInput }) });
    const responseObj = await response.json();
    setToken(responseObj.token);
    setLocation('TABLET');
  }
  // TODO: authenticate
  const authenticate = async () => {
    const response = await fetch(`${API}/authenticate`, { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
    const x = await response.json();
    if (!token) throw Error('no token');
    setLocation('TUNNEL');
  }

  const value = { location, signup, setLocation, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
