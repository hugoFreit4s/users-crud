import style from "./InsertCarForm.module.css";
import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import { useEffect, useState } from "react";
import CustomButton from "../../CustomButton/CustomButton";
import { getCarDTO } from "../CarsPage/CarsPage";
import { addCar, getCars } from "../../API";

type InsertCarFormProps = {
    users: getUserDTO[];
    updateCars: (newCars: getCarDTO[]) => void;
    closeModal: () => void;
}

export default function InsertCarForm({ users, updateCars, closeModal }: InsertCarFormProps) {
    const [brand, setBrand] = useState<string>();
    const [brandHasError, setBrandHasError] = useState<boolean>();

    const [modelName, setModelName] = useState<string>();
    const [modelNameHasError, setModelNameHasError] = useState<boolean>(false);

    const [owner, setOwner] = useState<getUserDTO>();
    const [ownerNameHasError, setOwnerNameHasError] = useState<boolean>(false);

    const [value, setValue] = useState<number>();
    const [valueHasError, setValueHasError] = useState<boolean>(false);

    const [manufactureYear, setManufactureYear] = useState<number>();
    const [manufactureYearHasError, setManufactureYearHasError] = useState<boolean>(false);


    useEffect(() => {
        if (modelName === undefined || modelName.length <= 0) {
            setModelNameHasError(true);
        } else {
            setModelNameHasError(false);
        }
    }, [modelName]);

    useEffect(() => {
        if (brand === undefined || brand.length <= 0) {
            setBrandHasError(true);
        } else {
            setBrandHasError(false);
        }
    }, [brand]);

    useEffect(() => {
        if (owner?.name === undefined) {
            setOwnerNameHasError(true);
        } else {
            setOwnerNameHasError(false);
        }
    }, [owner?.name]);

    useEffect(() => {
        if (value === undefined || value <= 0) {
            setValueHasError(true);
        } else {
            setValueHasError(false);
        }
    }, [value]);

    useEffect(() => {
        if (manufactureYear === undefined || manufactureYear < 1900 || manufactureYear > new Date().getFullYear()) {
            setManufactureYearHasError(true);
        } else {
            setManufactureYearHasError(false);
        }
    }, [manufactureYear])

    async function callGetCars() {
        return await getCars();
    }

    return (
        <main>
            <label>Brand</label>
            <input type="text" className={style["input-box"]} onChange={e => setBrand(e.target.value)} />
            {brandHasError && <span className={style["error-msg"]}>Brand name can't be empty!</span>}

            <label>Model name</label>
            <input type="text" className={style["input-box"]} onChange={e => setModelName(e.target.value)} />
            {modelNameHasError && <span className={style["error-msg"]}>Model name can't be empty!</span>}

            <label>Owner</label>
            <select className={style["input-box"]} onChange={e => {
                users.map(user => {
                    if (Number(e.target.value) === user.id) {
                        setOwner(user);
                    }
                });
            }}>
                {users.map(user => {
                    return <option value={user.id}>{user.name}</option>
                })}
            </select>
            {ownerNameHasError && <span className={style["error-msg"]}>Car must have an owner!</span>}

            <label>Car value</label>
            <input type="number" min={0} className={style["input-box"]} onChange={e => setValue(Number(e.target.value))} />
            {valueHasError && <span className={style["error-msg"]}>Value must be greater than 0!</span>}

            <label>Manufacture year</label>
            <input type="number" min={1900} max={new Date().getFullYear()} step={1} className={style["input-box"]} onChange={e => setManufactureYear(Number(e.target.value))} />
            {manufactureYearHasError && <span className={`${style["error-msg"]} ${style["year-error-message"]}`}>Manufacture year must be greater than 1900 and less than the current year!</span>}
            <CustomButton
                className="primary-btn"
                onClickEvent={() => {
                    if (!brandHasError && !modelNameHasError && !ownerNameHasError && !valueHasError && !manufactureYearHasError) {
                        addCar({ id: null, manufactureYear: manufactureYear!, brand: brand!, modelName: modelName!, value: value!, owner: owner! });
                        const fecthCars = async () => {
                            try {
                                const cars = await callGetCars();
                                updateCars(cars);
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        fecthCars();
                        closeModal();
                    }
                }}
                textContent="Add car"
                key={1}
            />
        </main>
    )
}