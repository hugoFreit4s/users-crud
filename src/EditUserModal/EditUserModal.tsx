import { useEffect, useState } from "react";
import { User } from "../App";
import style from "./EditUserModal.module.css";
import EditUserForm from "../EditUserForm/EditUserForm";

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
                    <EditUserForm
                        setAge={setUserAgeInput}
                        setName={setUserNameInput}
                        setPhone={setUserPhoneInput}
                        age={userAgeInput}
                        name={userNameInput}
                        phone={userPhoneInput}
                        cancelEdit={cancelEdit}
                        onClickEvent={onClickEvent}
                    />
                </div>
                <div className={style["bottom"]}>
                </div>
            </div>
        </div >)
}