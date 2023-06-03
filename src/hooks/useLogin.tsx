import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const { login } = useAuth();

  return login;
}
