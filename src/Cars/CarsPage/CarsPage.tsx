import style from "./CarsPage.module.css";
import NavigateBackButton from "../../NavigateBackButton/NavigateBackButton";
import { useEffect, useState } from "react";
import { getCars } from "../../API";
import AllCarsList from "../AllCarsList/AllCarsList";
import CustomButton from "../../CustomButton/CustomButton";

export type getCarDTO = { id: number, ownerName: string, name: string, value: number };
export default function CarsPage() {
    const [cars, setCars] = useState<getCarDTO[]>([]);
    const [isInsertCarModalOpen, setIsInsertCarModalOpen] = useState<boolean>(false);
    const [isCarListOpen, setIsCarListOpen] = useState<boolean>(false);

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
                <div className={style["edit-and-add-btns"]}>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => setIsInsertCarModalOpen(!isInsertCarModalOpen)}
                        textContent='+ New Car'
                    />
                    {isInsertCarModalOpen && "open!"}
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