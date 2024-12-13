import style from "./CarsPage.module.css";
import NavigateBackButton from "../../NavigateBackButton/NavigateBackButton";
import { useEffect, useState } from "react";
import { filterCars, getCars, getUsers } from "../../API";
import AllCarsContainer from "../AllCarsContainers/AllCarsContainers";
import CustomButton from "../../CustomButton/CustomButton";
import InsertCarModal from "../InsertCarModal/InsertCarModal";
import { getUserDTO, postUserDTO } from "../../Users/UsersPage/UsersPage";
import BrandFilter from "../BrandFilter/BrandFilter";

export type getCarDTO = { id: number, manufactureYear: number, brand: string, modelName: string, ownerName: string, name: string, value: number };
export type postCarDTO = { id: null | number, manufactureYear: number, brand: string, modelName: string, value: number, owner: postUserDTO };

export default function CarsPage() {
    const [cars, setCars] = useState<getCarDTO[]>([]);
    const [users, setUsers] = useState<getUserDTO[]>([]);
    const [isInsertCarModalOpen, setIsInsertCarModalOpen] = useState<boolean>(false);
    const [isCarListOpen, setIsCarListOpen] = useState<boolean>(false);
    const [brand, setBrand] = useState<string>("default");
    const [brands, setBrands] = useState<string[]>([]);
    const [minValue, setMinValue] = useState<string>();
    const [maxValue, setMaxValue] = useState<string>();

    async function callGetCars() {
        return await getCars();
    }

    async function callGetUsers() {
        return await getUsers();
    }

    async function callFilterCars(brand: string, minValue: string, maxValue: string) {
        return await filterCars(brand, minValue, maxValue);
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
                    <BrandFilter
                        brand={brand}
                        brands={brands}
                        setBrand={brand => setBrand(brand)}
                    />
                    <input type="number" value={minValue} onChange={e => setMinValue(e.target.value)} />
                    <input type="number" value={maxValue} onChange={e => setMaxValue(e.target.value)} />
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            console.log('min: ', minValue, '\nmax: ', maxValue)
                            const fetchCars = async () => {
                                try {
                                    const cars = await callFilterCars(brand, minValue!, maxValue!);
                                    setCars(cars);
                                    setMinValue("")
                                    setMaxValue("")
                                } catch (error) {
                                    console.log(error)
                                }
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
                                setBrand("default");
                                setMinValue("");
                                setMaxValue("");
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