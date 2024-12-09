import { useEffect, useState } from "react";
import style from "./InsertUserForm.module.css";
import CustomButton from "../CustomButton/CustomButton";
import { postUserDTO } from "../App";

type InsertUserFormProps = {
    insertUser: (user: postUserDTO) => void;
}

export default function InsertUserForm({ insertUser }: InsertUserFormProps) {

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [gender, setGender] = useState<string>("");
    const [nameErrorClass, setNameErrorClass] = useState<string>("hide-error");
    const [nameError, setNameError] = useState<boolean>(false);
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
    }, [name])

    useEffect(() => {
        if (phone !== undefined && phone.length !== 11) {
            setPhoneErrorClass("show-error")
            setPhoneError(true);
        } else {
            setPhoneErrorClass("hide-error")
            setPhoneError(false);
        }
    }, [phone])

    return (
        <div className={style["inputs-div"]}>
            <div className={style["top-div"]}>
                <div className={style["single-input-div"]}>
                    <p>Name</p>
                    <input className={style["input-box"]} value={name} type="text" onChange={e => setName(e.target.value)} />
                    <span className={style[nameErrorClass]}>Name must have more than 2 characters</span>
                </div>
                <div className={style["single-input-div"]}>
                    <p>Gender</p>
                    <select value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="M">M</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <div className={style["single-input-div"]}>
                    <p>Birth date</p>
                    <input className={style["input-box"]} type="date" onChange={e => setBirthDate(new Date(e.target.value))} />
                    <span className={style['']}>Date can't be empty</span>
                </div>
                <div className={style["single-input-div"]}>
                    <p>Phone</p>
                    <input className={style["input-box"]} value={phone} type="text" maxLength={11} onChange={e => setPhone(e.target.value)} />
                    <span className={style[phoneErrorClass]}>Phone must be 11 characters</span>
                </div>
            </div>
            <div className={style["bottom-div"]}>
                <CustomButton
                    className="primary-btn"
                    onClickEvent={() => {
                        if (!phoneError && !nameError) {
                            insertUser({ id: null, gender: gender, name: name!, birthDate: birthDate, phone: phone! })
                        }
                    }}
                    textContent='Insert User'
                />
            </div>
        </div>
    )
}