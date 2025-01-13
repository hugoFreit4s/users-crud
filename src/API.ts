import { postCarDTO } from "./components/CarsPage/CarsPage";
import { postUserDTO } from "./components/UsersPage/AllUsersContainers";

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

export async function filterCars(brand: string, minValue: string | undefined, maxValue: string | undefined) {
    const brandToFilter: string | undefined = brand === "default" ? undefined : brand;
    let minValueToFilter: number = 0;
    if (minValue === "" || minValue === undefined) {
        minValueToFilter = 0;
    } else {
        minValueToFilter = Number(minValue);
    }
    let maxValueToFilter: number | undefined = 0;
    if (maxValue === "" || maxValue === undefined) {
        maxValueToFilter = undefined;
    } else {
        maxValueToFilter = Number(maxValue);
    }

    if (brandToFilter !== undefined && maxValueToFilter !== undefined) {
        console.log(`1: http://localhost:8080/car/filter?brand=${brand}&minValue=${minValueToFilter}&maxValue=${maxValueToFilter}`);
        const data = await fetch(`http://localhost:8080/car/filter?brand=${brand}&minValue=${minValueToFilter}&maxValue=${maxValueToFilter}`);
        const res = data.json();
        return res;
    } else if (brandToFilter !== undefined && maxValueToFilter === undefined) {
        console.log(`2: http://localhost:8080/car/filter?brand=${brand}&minValue=${minValueToFilter}`);
        const data = await fetch(`http://localhost:8080/car/filter?brand=${brand}&minValue=${minValueToFilter}`);
        const res = data.json();
        return res;
    } else if (brandToFilter === undefined && maxValueToFilter !== undefined) {
        console.log(`3: http://localhost:8080/car/filter?minValue=${minValueToFilter}&maxValue=${maxValueToFilter}`);
        const data = await fetch(`http://localhost:8080/car/filter?minValue=${minValueToFilter}&maxValue=${maxValueToFilter}`);
        const res = data.json();
        return res;
    } else {
        console.log(`4: http://localhost:8080/car/filter?minValue=${minValueToFilter}`);
        const data = await fetch(`http://localhost:8080/car/filter?minValue=${minValueToFilter}`);
        const res = data.json();
        return res;
    }
}

export async function filterUsers(gender: string | undefined, minAge: string | undefined, maxAge: string | undefined) {
    const genderToFilter = gender === "default" ? undefined : gender;
    const url = new URL("http://localhost:8080/user/filter");
    if (genderToFilter !== undefined) {
        url.searchParams.append("gender", genderToFilter);
    }

    if (minAge !== undefined) {
        url.searchParams.append("minAge", minAge);
    }

    if (maxAge !== undefined) {
        url.searchParams.append("maxAge", maxAge);
    }
    console.log(url)
    const data = await fetch(url);
    const res = await data.json();
    return res;
}