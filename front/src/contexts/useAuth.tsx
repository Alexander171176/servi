/*
useAuth: Это пользовательский хук, 
который используется для получения данных аутентификации из контекста AuthProvider. 
Он может предоставлять методы и информацию о пользователе, 
например, для проверки статуса аутентификации или получения данных пользователя.
*/
import { useContext } from "react";
import { UserContext } from "./AuthProvider";

export default function useAuth() {
  const userContext = useContext(UserContext);
  return userContext?.user || null;
}

