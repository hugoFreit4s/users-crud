import { User } from "./App";

export async function getUsers() {
    try {
        const data = await fetch("http://localhost:8080/user");
        const res = await data.json();
        return res;
    } catch (e) {
        console.log("erro: ", e);
    }
}

export async function insertUser(user: User) {
    try {
        await fetch("http://localhost:8080/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
    } catch (error) {
        console.log(error);
    }
    return await getUsers();
}

export async function editUser(user: User) {
    try {
        await fetch("http://localhost:8080/user",
            {
                method: "PUT", headers: { "Content-Type": "application/json" }
                , body: JSON.stringify(user)
            })
    } catch (error) {
        console.log(error);
    }
    return await getUsers();
}

export async function deleteUser(ID: string) {
    try {
        await fetch("http://localhost:8080/user", { method: "DELETE", body: ID });
    } catch (error) {
        console.log(error);
    }
    return await getUsers();
}