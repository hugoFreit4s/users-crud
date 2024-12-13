import style from "./CarsPage.module.css";
import NavigateBackButton from "../../NavigateBackButton/NavigateBackButton";
import { useEffect, useState } from "react";
import { filterCars, getCars, getUsers } from "../../API";
import AllCarsContainer from "../AllCarsContainers/AllCarsContainers";
import CustomButton from "../../CustomButton/CustomButton";
import InsertCarModal from "../InsertCarModal/InsertCarModal";
import { getUserDTO, postUserDTO } from "../../Users/UsersPage/UsersPage";
import BrandFilter from "../BrandFilter/BrandFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import FiltersModal from "../FiltersModal/FiltersModal";

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
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

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
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => setIsFilterModalOpen(true)}
                        textContent="Create filter"
                    />
                    {isFilterModalOpen &&
                        <FiltersModal
                            brand={brand}
                            brands={brands}
                            setBrand={val => setBrand(val)}
                            minValue={minValue}
                            maxValue={maxValue}
                            setMinValue={val => setMinValue(val)}
                            setMaxValue={val => setMaxValue(val)}
                            clearFiltersFunction={() => {
                                const fetchCars = async () => {
                                    const cars = await callGetCars();
                                    setCars(cars);
                                    setBrand("default");
                                    setMinValue("");
                                    setMaxValue("");
                                    setIsFilterModalOpen(false);
                                }
                                fetchCars();
                            }}
                            closeModal={() => setIsFilterModalOpen(false)}
                            filterFunction={() => {
                                console.log('min: ', minValue, '\nmax: ', maxValue)
                                const fetchCars = async () => {
                                    try {
                                        const cars = await callFilterCars(brand, minValue!, maxValue!);
                                        setCars(cars);
                                        setBrand("default");
                                        setMinValue("");
                                        setMaxValue("");
                                        setIsFilterModalOpen(false);
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                                fetchCars();
                            }}
                        />}
                    <CustomButton
                        className="secondary-btn"
                        onClickEvent={() => {
                            const fetchCars = async () => {
                                const cars = await callGetCars();
                                setCars(cars);
                                setBrand("default");
                                setMinValue("");
                                setMaxValue("");
                                setIsFilterModalOpen(false);
                            }
                            fetchCars();
                        }}
                        textContent="Clear filters"
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