import style from "./CarsPage.module.css";
import NavigateBackButton from "../../NavigateBackButton/NavigateBackButton";
import { useEffect, useState } from "react";
import { getCars, getUsers } from "../../API";
import AllCarsList from "../AllCarsList/AllCarsList";
import CustomButton from "../../CustomButton/CustomButton";
import InsertCarModal from "../InsertCarModal/InsertCarModal";
import { getUserDTO } from "../../Users/UsersPage/UsersPage";

export type getCarDTO = { id: number, ownerName: string, name: string, value: number };
export type postCarDTO = { id: null, ownerName: string, value: number };

export default function CarsPage() {
    const [cars, setCars] = useState<getCarDTO[]>([]);
    const [users, setUsers] = useState<getUserDTO[]>([]);
    const [isInsertCarModalOpen, setIsInsertCarModalOpen] = useState<boolean>(false);
    const [isCarListOpen, setIsCarListOpen] = useState<boolean>(false);

    async function callGetCars() {
        return await getCars();
    }

    async function callGetUsers() {
        return await getUsers();
    }

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const cars = await callGetCars();
                setCars(cars);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCars();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await callGetUsers();
                setUsers(users);
            } catch (e) {
                console.log(e);
            }
        }
        fetchUsers();
    }, [])

    return (
        <main>
            <div className={style["top-container"]}>
                <NavigateBackButton path="/" />
                <div className={style["edit-and-add-btns"]}>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => setIsInsertCarModalOpen(!isInsertCarModalOpen)}
                        textContent='+ New Car'
                    />
                    {isInsertCarModalOpen && <InsertCarModal users={users} closeModal={() => setIsInsertCarModalOpen(!isInsertCarModalOpen)} />}
                    <CustomButton
                        className="secondary-btn"
                        onClickEvent={() => setIsCarListOpen(!isCarListOpen)}
                        textContent='See all cars'
                    />
                </div>
            </div>
            <div className={style["main-content"]}>
                <AllCarsList cars={cars} />
            </div>
        </main>
    )
}