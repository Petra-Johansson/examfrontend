'use client';
import { getUsers } from "@/app/api/users/apiCalls";
import { useState, useEffect } from "react";
import styles from './user.module.css';

// defins what we want to get from user to display
interface UserCard {
    id: number;
    name: string;
    email: string;
    phone: string;
    image: string;
}

const UserCard: React.FC = () => {
    const [users, setUsers] = useState<UserCard[]>([]);

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

    return (
        <>
            {users.length > 0 ? (
                users.map((user) => (

                    <div className={styles.card} key={user.id}>
                        <img src={user.image} alt="Profile picture" className={styles.profilePic} />
                        <p>name: {user.name}</p>
                        <p>phone: {user.phone}</p>
                        <p>email: {user.email}</p>
                        <button className={styles.updateBtn}>Update info</button>
                    </div>
                ))
            )
                : (
                    <p> No users available </p>
                )}
        </>
    );

};
export default UserCard;
