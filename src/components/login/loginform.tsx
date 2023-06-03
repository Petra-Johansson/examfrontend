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
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const login = useLogin();
  const router = useRouter();

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(email, password);
      // Login was successful
      router.push("/account/user"); // redirect to dashboard
    } catch (err) {
      // Login failed
      console.error(err);
      setEmailError("Invalid credentials"); // Set the error message
      setPasswordError("Invalid credentials"); // Set the error message
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Logga in</h2>
      {passwordError && (
        <div className={styles.errorMessage}>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <br />
          <p>{passwordError}</p>
        </div>
      )}

      {emailError && (
        <div className={styles.errorMessage}>
          <FontAwesomeIcon icon={faTriangleExclamation} />
          <br />
          <p>{emailError}</p>
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
