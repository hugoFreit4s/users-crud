import { useEffect, useState } from "react";
import style from "./InsertUserForm.module.css";
import CustomButton from "../../CustomButton/CustomButton";
import { postUserDTO } from "../UsersPage/UsersPage";

type InsertUserFormProps = {
    insertUser: (user: postUserDTO) => void;
}

export default function InsertUserForm({ insertUser }: InsertUserFormProps) {

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date>();
    const [birthDateStringFormat, setBirthDateStringFormat] = useState<string>();
    const [gender, setGender] = useState<string>("default");
    const [genderError, setGenderError] = useState<boolean>(false);
    const [genderErrorClass, setGenderErrorClass] = useState<string>("hide-error");
    const [nameErrorClass, setNameErrorClass] = useState<string>("hide-error");
    const [nameError, setNameError] = useState<boolean>(false);
    const [phoneErrorClass, setPhoneErrorClass] = useState<string>("hide-error");
    const [phoneError, setPhoneError] = useState<boolean>(false);
    const [birthDateErrorClass, setBirthDateErrorClass] = useState<string>("hide-error");
    const [birthDateError, setBirthDateError] = useState<boolean>(false);

    const [maxDate, setMaxDate] = useState<string>();

    useEffect(() => {
        if (name !== undefined && name.length <= 2) {
            setNameErrorClass("show-error");
            setNameError(true);
        } else {
            setNameErrorClass("hide-error");
            setNameError(false);
        }
    }, [name]);

    useEffect(() => {
        if (phone !== undefined && phone.length !== 11) {
            setPhoneErrorClass("show-error")
            setPhoneError(true);
        } else {
            setPhoneErrorClass("hide-error")
            setPhoneError(false);
        }
    }, [phone]);

    useEffect(() => {
        if (birthDate === undefined || birthDate === null) {
            setBirthDateErrorClass("show-error");
            setBirthDateError(true);
        } else {
            setBirthDateStringFormat(`${birthDate.getFullYear()}-${birthDate.getUTCMonth() + 1}-${birthDate.getUTCDate()}`.trim());
            setBirthDateErrorClass("hide-error");
            setBirthDateError(false);
        }
    }, [birthDate]);

    useEffect(() => {
        if (gender === 'default') {
            setGenderError(true);
            setGenderErrorClass("show-error");
        } else {
            setGenderError(false);
            setGenderErrorClass("hide-error");
        }
    }, [gender]);
    
    useEffect(() => {
        const date = new Date();
        const year = date.getFullYear() - 18;
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        setMaxDate(`${year}-${month}-${day}`);
    }, []);

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
                        <option value="default" disabled hidden>Select a gender</option>
                        <option value="m">M</option>
                        <option value="f">F</option>
                        <option value="other">Other</option>
                    </select>
                    <span className={style[genderErrorClass]}>Gender can't be empty</span>
                </div>
                <div className={style["single-input-div"]}>
                    <p>Birth date</p>
                    <input className={style["input-box"]} type="date" max={maxDate} onChange={e => setBirthDate(new Date(e.target.value))} />
                    <span className={style[birthDateErrorClass]}>Date can't be empty!</span>
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
                        if (!phoneError && !nameError && !birthDateError && !genderError) {
                            insertUser({ id: null, gender: gender!, name: name!, birthDate: birthDateStringFormat!, phone: phone! });
                        }
                    }}
                    textContent='Insert User'
                />
            </div>
        </div>
    )
}