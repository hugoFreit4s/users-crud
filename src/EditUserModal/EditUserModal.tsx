import { useEffect, useState } from "react";
import { User } from "../App";
import CustomButton from "../CustomButton/CustomButton";
import InsertUserInput from "../InsertUserForm/InsertUserForm";
import style from "./EditUserModal.module.css";

type EditUserModalProps = {
    user: User;
    cancelEdit: () => void;
    onClickEvent: (
        userAgeInput: string,
        userNameInput: string,
        userPhoneInput: string
    ) => void;
}

export default function EditUserModal({ user, cancelEdit, onClickEvent }: EditUserModalProps) {
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [userAgeInput, setUserAgeInput] = useState<string>('');
    const [userPhoneInput, setUserPhoneInput] = useState<string>('');

    useEffect(() => {
        setUserNameInput(user.name);
        setUserAgeInput(user.age.toString());
        setUserPhoneInput(user.phone);
    }, [])
    return (
        <div className={style.backdrop} onClick={cancelEdit} >
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <div className={style["top"]}>
                    <p><span style={{ color: "red" }}>Atention: You're editing {user.name} data.</span></p>
                    <hr />
                    <p>This can't be undone</p>
                </div>
                <div className={style["mid"]}>
                    <InsertUserInput
                        setAge={setUserAgeInput}
                        setName={setUserNameInput}
                        setPhone={setUserPhoneInput}
                        age={userAgeInput}
                        name={userNameInput}
                        phone={userPhoneInput}
                    />
                </div>
                <div className={style["bottom"]}>
                    <CustomButton
                        className="secondary-btn"
                        onClickEvent={cancelEdit}
                        textContent="Cancel"
                    />
                    <CustomButton
                        className="danger-btn"
                        onClickEvent={() => onClickEvent(userAgeInput, userNameInput, userPhoneInput)}
                        textContent="Confirm"
                        key={user.id}
                    />
                </div>
            </div>
        </div >)
}