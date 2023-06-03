"use client";
import { useState, useEffect } from "react";

import styles from "./user.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
// defins what we want to get from user to display
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setUser(profileData);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch profile");
        setIsLoading(false);
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p>Hmm, något gick fel. Testa att logga in igen.</p>
      </div>
    );
  }

  return (
    <>
      <h2>Hej {user.name}, här är din profil</h2>
      <div className={styles.card} key={user.id}>
        <img
          src={user.image}
          alt="Profile picture"
          className={styles.profilePic}
        />
        <h3>{user.name}</h3>
        <p>Contract number: {user.contractNumber}</p>

        <div className={styles.contactInfo}>
          <h4>Contact information: </h4>
          <p>
            <FontAwesomeIcon icon={faPhone} /> <span>{user.phone}</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faAt} /> <span>{user.email}</span>
          </p>
        </div>
        <button className={styles.updateBtn}>Uppdatera information</button>
      </div>
    </>
  );
};
export default UserCard;
