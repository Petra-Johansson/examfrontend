"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useLogin();
  const router = useRouter();

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setError("");
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      // Login was successful
      router.push("/account/user"); // redirect to dashboard
    } catch (error: any) {
      console.log(error.response.data.message);
      if (error.response.data.message.includes("email" || "password")) {
        setError("Fel lösenord eller email");
      } else {
        setError("Ojdå, något gick fel. Försök igen!.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Logga in</h2>

      {error && (
        <div className={styles.errorMessage}>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <br />
          <p>{error}</p>
        </div>
      )}
      <input
        type="email"
        value={email}
        onChange={handleChangeEmail}
        placeholder="Din Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={handleChangePassword}
        placeholder="Ditt lösenord"
        required
      />

      <button type="submit">Logga in</button>
    </form>
  );
}

export default LoginForm;
