import { postUserDTO } from "./App";

export async function getUsers() {
    const data = await fetch("http://localhost:8080/user");
    const res = await data.json();
    return res;
}

export async function insertUser(user: postUserDTO) {
    let toastMessage = '';
    let toastCategory = '';
    let users;
    const seralizedUser = { ...user, birthDate: user.birthDate?.toISOString().split('T')[0] }
    try {
        await fetch("http://localhost:8080/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seralizedUser)
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

export async function editUser(user: postUserDTO) {
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