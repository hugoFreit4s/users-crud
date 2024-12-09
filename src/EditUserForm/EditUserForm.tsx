import { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import style from "../InsertUserForm/InsertUserForm.module.css";
type EditUserFormProps = {
    name: string;
    setName: (name: string) => void;
    birthDate: Date | null;
    setBirthDate: (birthDate: Date) => void;
    phone: string;
    setPhone: (phone: string) => void;
    cancelEdit: () => void;
    onClickEvent: (
        userAgeInput: string,
        userNameInput: string,
        userPhoneInput: string
    ) => void;
}

export default function EditUserForm({ name, setName, birthDate, setBirthDate, phone, setPhone, cancelEdit, onClickEvent }: EditUserFormProps) {

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
                    className="secondary-btn"
                    onClickEvent={cancelEdit}
                    textContent="Cancel"
                />
                <CustomButton
                    className="danger-btn"
                    onClickEvent={() => {
                        if (!phoneError && !nameError) {
                            onClickEvent(birthDate!.toString(), name, phone)
                        }
                    }}
                    textContent="Confirm"
                />
            </div>
        </div>
    )
}