import { User } from "./App";

export async function getUsers() {
    const data = await fetch("http://localhost:8080/user");
    const res = await data.json();
    return res;
}

export async function insertUser(user: User) {
    await fetch("http://localhost:8080/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    })
    return await getUsers();
}

export async function editUser(user: User) {
    await fetch("http://localhost:8080/user",
        {
            method: "PUT", headers: { "Content-Type": "application/json" }
            , body: JSON.stringify(user)
        })
    return await getUsers();
}

export async function deleteUser(ID: string) {
    await fetch("http://localhost:8080/user", { method: "DELETE", body: ID });
    return await getUsers();
}