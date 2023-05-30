'use client';
import { userLogin, getProfile } from "@/app/api/users/apiCalls";
import { useState, useEffect } from "react";
import styles from './user.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faPhone } from '@fortawesome/free-solid-svg-icons';
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
    // const [users, setUsers] = useState<UserCard[]>([]);

    // setting the user-variable to match UserCard interface
    const [user, setUser] = useState<UserCard | null>(null);
    /*
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const res = await getUsers();
                    console.log('res:', res)
                    const fetchedUsers = res.users.map((item : {user: UserCard}) => item.user);
                    console.log('users:', fetchedUsers)
                    setUsers(fetchedUsers);
                } catch (error) {
                    console.log(error)
                }
            };
            fetchUser();
    
        }, []);
    */

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const userProfile = await getProfile();
                setUser(userProfile);
            } catch (error) {
                console.log(error);
            }
        };

        getUserProfile();
    }, []);

    if (!user) {
        return <div><p> Hmm, something is wwrong. Please Log In again</p></div>;
    }

    return (
        <>
            <div className={styles.card} key={user.id}>
                <img src={user.image} alt="Profile picture" className={styles.profilePic} />
                <h3>{user.name}</h3>
                <p>Contract number: {user.contractNumber}</p>

                <div className={styles.contactInfo}>
                    <h4>Contact information: </h4>
                    <p><FontAwesomeIcon icon={faPhone} />{" "}<span>{user.phone}</span></p>
                    <p><FontAwesomeIcon icon={faAt} />{" "}<span>{user.email}</span></p>
                </div>
                <button className={styles.updateBtn}>Update info</button>
            </div>

        </>
    );

};
export default UserCard;
