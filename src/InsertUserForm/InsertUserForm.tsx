import { useEffect, useState } from "react";
import style from "./InsertUserForm.module.css";
import CustomButton from "../CustomButton/CustomButton";
import { User } from "../App";

type InsertUserFormProps = {
    insertUser: (user: User) => void;
}

export default function InsertUserForm({ insertUser }: InsertUserFormProps) {

    const [name, setName] = useState<string>();
    const [age, setAge] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [nameErrorClass, setNameErrorClass] = useState<string>("hide-error");
    const [nameError, setNameError] = useState<boolean>(false);
    const [ageErrorClass, setAgeErrorClass] = useState<string>("hide-error");
    const [ageError, setAgeError] = useState<boolean>(false);
    const [phoneErrorClass, setPhoneErrorClass] = useState<string>("hide-error");
    const [phoneError, setPhoneError] = useState<boolean>(false);

    useEffect(() => {
        if (name !== undefined && (name.length >= 1 && name.length <= 2)) {
            setNameErrorClass("show-error");
            setNameError(true);
        } else {
            setNameErrorClass("hide-error");
            setNameError(false);
        }
        if (age !== undefined && (Number(age) <= 0 && age.length > 0)) {
            setAgeErrorClass("show-error");
            setAgeError(true);
        } else {
            setAgeErrorClass("hide-error");
            setAgeError(false);
        }
        if (phone !== undefined && phone.length !== 11) {
            setPhoneErrorClass("show-error")
            setPhoneError(true);
        } else {
            setPhoneErrorClass("hide-error")
            setPhoneError(false);
        }
        if (phone !== undefined && phone.length > 11) {
            setPhone(phone.slice(0, 11));
        }
    }, [name, age, phone]);

    return (
        <div className={style["inputs-div"]}>
            <div className={style["top-div"]}>
                <div className={style["single-input-div"]}>
                    <p>Name</p>
                    <input className={style["input-box"]} value={name} type="text" onChange={e => setName(e.target.value)} />
                    <span className={style[nameErrorClass]}>Name must have more than 2 characters</span>
                </div>
                <div className={style["single-input-div"]}>
                    <p>Age</p>
                    <input className={style["input-box"]} min={0} value={age} type="number" onChange={e => setAge(e.target.value)} />
                    <span className={style[ageErrorClass]}>Age can't be less than 1</span>
                </div>
                <div className={style["single-input-div"]}>
                    <p>Phone</p>
                    <input className={style["input-box"]} value={phone} type="text" onChange={e => setPhone(e.target.value)} />
                    <span className={style[phoneErrorClass]}>Phone must be 11 characters</span>
                </div>
            </div>
            <div className={style["bottom-div"]}>
                <CustomButton
                    className="primary-btn"
                    onClickEvent={() => {
                        if (!phoneError && !nameError && !ageError) {
                            insertUser({ id: 0, name: name!, age: Number(age), phone: phone! })
                            setName('');
                            setAge('');
                        }
                    }}
                    textContent='Insert User'
                />
            </div>
        </div>
    )
}