import { useAuth } from "../context/AuthContext";

export function useSignup() {
  const { signup } = useAuth();

  return signup;
}
