import { useEffect, useState } from "react";
import style from "./AllUsersContainers.module.css";
import { getUsers } from "../../API";
import UserContainer from "./UserContainer";

export type postUserDTO = { id: null, name: string, gender: string, birthDate: string, phone: string };
export type getUserDTO = { id: number, name: string, gender: string, phone: string, age: number, birthDate: Date };

export default function AllUsersContainers() {
    const [users, setUsers] = useState<getUserDTO[]>([]);

    async function callGetUsers() {
        return await getUsers();
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await callGetUsers();
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, []);

    return (
        <main className={style.main}>
            {users.map(u => {
                return <UserContainer user={u} key={u.id} />
            })}
        </main>
    )
}