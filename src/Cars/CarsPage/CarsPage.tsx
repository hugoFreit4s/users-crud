import style from "./CarsPage.module.css";
import NavigateBackButton from "../../NavigateBackButton/NavigateBackButton";
import { useEffect, useState } from "react";
import { filterCarByBrand, getCars, getUsers } from "../../API";
import AllCarsContainer from "../AllCarsContainers/AllCarsContainers";
import CustomButton from "../../CustomButton/CustomButton";
import InsertCarModal from "../InsertCarModal/InsertCarModal";
import { getUserDTO, postUserDTO } from "../../Users/UsersPage/UsersPage";

export type getCarDTO = { id: number, manufactureYear: number, brand: string, modelName: string, ownerName: string, name: string, value: number };
export type postCarDTO = { id: null | number, manufactureYear: number, brand: string, modelName: string, value: number, owner: postUserDTO };

export default function CarsPage() {
    const [cars, setCars] = useState<getCarDTO[]>([]);
    const [users, setUsers] = useState<getUserDTO[]>([]);
    const [isInsertCarModalOpen, setIsInsertCarModalOpen] = useState<boolean>(false);
    const [isCarListOpen, setIsCarListOpen] = useState<boolean>(false);
    const [brand, setBrand] = useState<string>();
    const [filterValue, setFilterValue] = useState<string>("default");
    const [brands, setBrands] = useState<string[]>([]);

    async function callGetCars() {
        return await getCars();
    }

    async function callGetUsers() {
        return await getUsers();
    }

    async function callFilterCarByBrand(brand: string) {
        return await filterCarByBrand(brand);
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
    }, []);

    useEffect(() => {
        const uniqueBrands = new Set<string>();
        cars.forEach(car => {
            uniqueBrands.add(car.brand);
        });
        setBrands(Array.from(uniqueBrands));
    }, [cars]);

    return (
        <main>
            <div className={style["top-container"]}>
                <NavigateBackButton path="/" />
                <div className={style["filter-container"]}>
                    <div>
                        Filter:
                    </div>
                    <select defaultValue={"default"} value={brand} className={style["input-box"]} onChange={e => setBrand(e.target.value)}>
                        <option value="default" disabled hidden>Brand</option>
                        {brands.map(brand => { return <option value={brand}>{brand}</option> })}
                    </select>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            const fetchCars = async () => {
                                const cars = await callFilterCarByBrand(brand!);
                                setCars(cars);
                            }
                            fetchCars();
                        }}
                        textContent="Filter"
                    />
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            const fetchCars = async () => {
                                const cars = await callGetCars();
                                setCars(cars);
                                setFilterValue("default");
                                setBrand("default");
                            }
                            fetchCars();
                        }}
                        textContent="Clean filters"
                    />
                </div>
                <div className={style["edit-and-add-btns"]}>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => setIsInsertCarModalOpen(!isInsertCarModalOpen)}
                        textContent='+ New Car'
                    />
                    {isInsertCarModalOpen && <InsertCarModal
                        users={users}
                        closeModal={() => setIsInsertCarModalOpen(!isInsertCarModalOpen)}
                        updateCars={cars => setCars(cars)}
                    />}
                    <CustomButton
                        className="secondary-btn"
                        onClickEvent={() => setIsCarListOpen(!isCarListOpen)}
                        textContent='See all cars'
                    />
                </div>
            </div>
            <div className={style["main-content"]}>
                <AllCarsContainer
                    cars={cars}
                    users={users}
                    updateCars={cars => setCars(cars)}
                />
            </div>
        </main >
    )
}