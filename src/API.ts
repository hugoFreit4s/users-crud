import { User } from "./App";

export async function getUsers() {
    const data = await fetch("http://localhost:8080/user");
    const res = await data.json();
    return res;
}

export async function insertUser(user: User) {
    let toastMessage = '';
    let toastCategory = '';
    let users;
    try {
        await fetch("http://localhost:8080/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        toastMessage = "User added!";
        toastCategory = "success";
        users = await getUsers();
    } catch (error) {
        toastMessage = "Operation Failed!";
        toastCategory = "fail";
        users = null;
    }
    const responseDTO = {
        users: users,
        toastMessage: toastMessage,
        toastCategory: toastCategory
    }
    return responseDTO;
}

export async function editUser(user: User) {
    await fetch(`http://localhost:8080/user/${user.id}`,
        {
            method: "PUT", headers: { "Content-Type": "application/json" }
            , body: JSON.stringify(user)
        })
    return await getUsers();
}

export async function deleteUser(ID: number) {
    await fetch(`http://localhost:8080/user/${ID}`, { method: "DELETE" });
    return await getUsers();
}