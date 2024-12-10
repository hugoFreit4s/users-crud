import style from "./InsertCarForm.module.css";
import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import { useEffect, useState } from "react";

type InsertCarFormProps = {
    users: getUserDTO[];
}

export default function InsertCarForm({ users }: InsertCarFormProps) {
    const [modelName, setModelName] = useState<string>();
    const [owner, setOwner] = useState<getUserDTO>();
    const [value, setValue] = useState<number>();

    useEffect(() => {
        console.log(owner);
    }, [owner])

    return (
        <main>
            <label>Model name</label>
            <input type="text" className={style["input-box"]} onChange={e => {
                setModelName(e.target.value);
            }} />
            <label>Owner name</label>
            <select className={style["input-box"]} onChange={e => {
                users.map(user => {
                    if (Number(e.target.value) === user.id) {
                        setOwner(user);
                    }
                });
            }}>
                {users.map(user => {
                    return <option value={user.id}>{user.name}</option>
                })}
            </select>
            <label>Car value</label>
            <input type="number" min={0} className={style["input-box"]} />
        </main >
    )
}