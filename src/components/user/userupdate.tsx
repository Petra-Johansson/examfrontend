import styles from "./user.module.css";
import { useAuth } from "../../context/AuthContext";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type UserUpdateFormProps = {
  isOpen: boolean;
  isClosed: () => void;
};

interface UserUpdateForm {
  name: string;
  email: string;
  phone: string;
  contractNumber: string;
  image: string;
}
const UserUpdateForm = ({ isOpen, isClosed }: UserUpdateFormProps) => {
  const { updateProfile, getProfile } = useAuth();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    contractNumber: "",
    image: "",
  });

  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      setFormState({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        contractNumber: profile.contractNumber || "",
        image: profile.image || "",
      });
    })();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await updateProfile(formState);

      await getProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
      <div className={styles.modalContent}>
        <button className={styles.closeBtn} onClick={isClosed}>
          X
        </button>
        <h3>Uppdatera din profil</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          {" "}
          <label>Namn:</label>
          <input name="name" value={formState.name} onChange={handleChange} />
          <label>Email</label>
          <input name="email" value={formState.email} onChange={handleChange} />
          <label>Telefonnummer:</label>
          <input name="phone" value={formState.phone} onChange={handleChange} />
          <label>Kontraktnummer:</label>
          <input
            name="contractNumber"
            value={formState.contractNumber}
            onChange={handleChange}
          />
          <input name="image" value={formState.image} onChange={handleChange} />
          <button type="submit" onClick={isClosed} className={styles.close}>
            Uppdatera
          </button>
        </form>
      </div>
    </div>
  );
};
export default UserUpdateForm;
