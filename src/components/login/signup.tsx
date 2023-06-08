"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useSignup";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contractNo, setContractNo] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const signup = useSignup();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();

      reader.onloadend = function () {
        // This will convert the file into a base64-encoded string
        const base64 = reader.result as string;
        setImage(base64);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleContractNumbChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContractNo(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await signup(name, email, phone, password, image, contractNo);
      router.push("/account/login");
    } catch (error) {}
  };

  return (
    <>
      <h2 className={styles.formHeader}>Registrera dig för att fortsätta </h2>
      <p className={styles.formParagraph}>
        Har du redan ett konto?{" "}
        <span>
          {" "}
          <Link href="/account/login"> Logga in här!</Link>
        </span>
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>E-mail</label>

        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Din e-mail"
          required
        />
        <label>Namn</label>

        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Ditt namn"
          required
        />
        <label>Telefonnummer</label>

        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Ditt telefonnummer"
          required
        />
        <label>Kontraktsnummer</label>
        <input
          type="text"
          value={contractNo}
          onChange={handleContractNumbChange}
          placeholder="Ditt kontraktsnummer"
        />
        <label>Profilbild</label>
        <input
          type="file"
          value={image}
          onChange={handleImageChange}
          placeholder="Profilbild"
        />
        <label>Lösenord</label>

        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Lösenord"
          required
        />
        <button type="submit">Skapa konto</button>
      </form>
    </>
  );
}

export default SignupForm;
