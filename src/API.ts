import { postCarDTO } from "./Cars/CarsPage/CarsPage";
import { postUserDTO } from "./Users/UsersPage/UsersPage";

export async function getUsers() {
    const data = await fetch("http://localhost:8080/user", { method: "GET" });
    const res = await data.json();

    return res;
}

export async function insertUser(user: postUserDTO) {
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

export async function editUser(user: postUserDTO) {
    await fetch(`http://localhost:8080/user/${user.id}`,
        {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
    return await getUsers();
}

export async function deleteUser(ID: number) {
    await fetch(`http://localhost:8080/user/${ID}`, { method: "DELETE" });
    return await getUsers();
}

export async function getCars() {
    const data = await fetch("http://localhost:8080/car", { method: "GET" });
    const res = data.json();

    return res;
}

export async function addCar(car: postCarDTO) {
    await fetch("http://localhost:8080/car",
        {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        })

    return await getCars();
}

export async function deleteCar(id: number) {
    await fetch("http://localhost:8080/car",
        {
            method: "DELETE", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id)
        })

    return await getCars();
}

export async function editCar(car: postCarDTO) {
    await fetch("http://localhost:8080/car",
        {
            method: "PUT", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(car)
        })

    return await getCars();
}

export async function filterCars(brand: string, minValue: number, maxValue: number) {
    const brandToFilter: string | undefined = brand === "default" ? undefined : brand;
    let url;
    if (brandToFilter !== undefined && minValue === undefined && maxValue === undefined) {
        url = `http://localhost:8080/car/filter?brand=${brandToFilter}`;
        const data = await fetch(url);
        const res = data.json();
        console.log(url);
        return res;
    } else if (brandToFilter !== undefined && minValue !== undefined && maxValue === undefined) {
        url = `http://localhost:8080/car/filter?brand=${brandToFilter}&minValue=${minValue}`;
        const data = await fetch(url);
        const res = data.json();
        console.log(url);
        return res;
    } else if (brandToFilter !== undefined && minValue === undefined && maxValue !== undefined) {
        url = `http://localhost:8080/car/filter?brand=${brandToFilter}&maxValue=${maxValue}`;
        const data = await fetch(url);
        const res = data.json();
        console.log(url);
        return res;
    }
}