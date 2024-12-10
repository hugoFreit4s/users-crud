import style from "./CarsPage.module.css";
import NavigateBackButton from "../NavigateBackButton/NavigateBackButton";
import { useEffect, useState } from "react";
import { getCars } from "../API";
import AllCarsList from "../AllCarsList/AllCarsList";

export type getCarDTO = { id: number, ownerName: string, name: string };
export default function CarsPage() {
    const [cars, setCars] = useState<getCarDTO[]>([]);

    async function callGetCars() {
        return await getCars();
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
    }, [])

    return (
        <main>
            <div className={style["top-container"]}>
                <NavigateBackButton path="/" />
            </div>
            <div className={style["main-content"]}>
                <AllCarsList cars={cars} />
            </div>
        </main>
    )
}