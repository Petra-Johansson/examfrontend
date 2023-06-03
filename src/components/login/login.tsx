"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

interface LoginFormProps {}
const LoginForm: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const credentials = { email, password };
      const { user } = await userLogin(credentials);
      router.push("/account/user");
    } catch (error: any) {
      console.log(error.message);
      if (error.message.includes("Email")) {
        setEmailError(error.message);
      } else if (error.message.includes("password")) {
        setPasswordError(error.message);
      } else {
        setEmailError("An error occurred. Please try again later.");
      }
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  return (
    <>
      <h2 className={styles.formHeader}>Login to continue</h2>
      <p className={styles.formParagraph}>
        Not registered?{" "}
        <span>
          {" "}
          <Link href="/account/signup">Sign up here!</Link>
        </span>
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
          placeholder="Your Email"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          placeholder="Password"
        />
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};
export default LoginForm;
