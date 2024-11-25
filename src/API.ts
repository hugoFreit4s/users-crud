import { User } from "./App";

export async function editUser(user: User) {
    const data = await fetch("http://localhost:8080/user",
        {
            method: "PUT", headers: { "Content-Type": "application/json" }
            , body: JSON.stringify(user)
        })
    const res = await data.json();
    return res;
}