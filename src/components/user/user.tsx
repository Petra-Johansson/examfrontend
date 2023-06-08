"use client";
import { useState, useEffect } from "react";
import styles from "./user.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import UserUpdateForm from "./userupdate";

// defines what we want to get from user to display
interface UserCard {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
  contractNumber: string;
}

const UserCard: React.FC = () => {
  const { getProfile } = useAuth();
  const [user, setUser] = useState<UserCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
        setIsLoading(false);
      } catch (error) {
        setError("Du är inte inloggad");
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className={styles.errorMessage}>
        <p>Hmm, något gick fel</p>
        <p>
          <Link href="/account/login">Logga in här igen!</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {error ||
        (!user && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
            <p>
              {" "}
              <Link href="/account/login">Logga in här!</Link>
            </p>
          </div>
        ))}
      <h2>Hej {user.name}, här är din profil</h2>
      <div className={styles.card} key={user.id}>
        <img
          src={user.image}
          alt="Profile picture"
          className={styles.profilePic}
        />
        <h3>{user.name}</h3>
        <p className={styles.contrNumb}>
          Contract number: {user.contractNumber}
        </p>

        <div className={styles.contactInfo}>
          <h4>Contact information: </h4>
          <p>
            <FontAwesomeIcon icon={faPhone} /> <span>{user.phone}</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faAt} /> <span>{user.email}</span>
          </p>
        </div>
        <button className={styles.updateBtn} onClick={handleModal}>
          Uppdatera information
        </button>
        <UserUpdateForm isOpen={modal} isClosed={handleCloseModal} />
      </div>
    </>
  );
};
export default UserCard;
