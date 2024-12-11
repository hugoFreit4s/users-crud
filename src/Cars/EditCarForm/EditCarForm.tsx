import { useEffect, useState } from "react";
import { getCarDTO, postCarDTO } from "../CarsPage/CarsPage";
import style from "./EditCarForm.module.css";
import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import CustomButton from "../../CustomButton/CustomButton";
import { editCar } from "../../API";

type EditCarFormProps = {
    car: getCarDTO;
    users: getUserDTO[];
    updateCars: (cars: getCarDTO[]) => void;
    closeModal: () => void;
}

function callEditCar(car: postCarDTO) {
    return editCar(car);
}

export default function EditCarForm({ car, users, updateCars, closeModal }: EditCarFormProps) {
    const [brand, setBrand] = useState<string>(car.brand);
    const [modelName, setModelName] = useState<string>(car.modelName);
    const [owner, setOwner] = useState<getUserDTO>();
    const [value, setValue] = useState<number>(car.value);
    const [manufactureYear, setManufactureYear] = useState<number>(car.manufactureYear);

    useEffect(() => { console.log(owner) }, [owner])

    return (
        <main className={style.main}>
            <div className={style["input-container"]}>
                <label>Car brand</label>
                <input className={style["input-box"]} type="text" value={brand} onChange={e => setBrand(e.target.value)} />
            </div>
            <div className={style["input-container"]}>
                <label>Car name</label>
                <input className={style["input-box"]} type="text" value={modelName} onChange={e => setModelName(e.target.value)} />
            </div>
            <div className={style["input-container"]}>
                <label>Owner</label>
                <select onChange={e => {
                    users.map(user => {
                        if (Number(e.target.value) === user.id) {
                            setOwner(user);
                        };
                    });
                }} defaultValue={"default"} className={style["input-box"]}>
                    <option value="default" disabled hidden>Choose the car owner</option>
                    {users.map(user => {
                        return <option value={user.id}>{user.name}</option>
                    })}
                </select>
            </div>
            <div className={style["input-container"]}>
                <label>Car value</label>
                <input className={style["input-box"]} type="number" value={value} onChange={e => setValue(Number(e.target.value))} />
            </div>
            <div className={style["input-container"]}>
                <label>Car manufacture year</label>
                <input className={style["input-box"]} type="number" value={manufactureYear} onChange={e => setManufactureYear(Number(e.target.value))} />
            </div>
            <div className={style.buttons}>
                <CustomButton
                    className="secondary-btn"
                    onClickEvent={() => { }}
                    textContent="Cancel"
                    key={crypto.randomUUID()}
                />
                <CustomButton
                    className="danger-btn"
                    onClickEvent={() => {
                        const fetchCars = async () => {
                            if (owner !== undefined) {
                                const cars = await callEditCar({ id: car.id, brand: brand, modelName: modelName, manufactureYear: manufactureYear, owner: owner, value: value });
                                updateCars(cars);
                            }
                        }
                        fetchCars();
                        closeModal();
                    }}
                    textContent="Confirm"
                    key={car.id}
                />
            </div>
        </main>
    )
}