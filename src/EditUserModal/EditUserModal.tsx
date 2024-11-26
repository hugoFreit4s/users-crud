import { useEffect, useState } from "react";
import { User } from "../App";
import CustomButton from "../CustomButton/CustomButton";
import UserInput from "../UserInput/UserInput";
import style from "./EditUserModal.module.css";

type EditUserModalProps = {
    user: User;
    cancelEdit: () => void;
    onClickEvent: (userAgeInput: string, userNameInput: string) => void;
}

export default function EditUserModal({ user, cancelEdit, onClickEvent }: EditUserModalProps) {
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [userAgeInput, setUserAgeInput] = useState<string>('');

    useEffect(() => {
        setUserNameInput(user.name);
        setUserAgeInput(user.age.toString());
    }, [])
    return (
        < div className={style["backdrop"]} onClick={cancelEdit} >
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <div className={style["top"]}>
                    <p><span style={{ color: "red" }}>Atention: You're editing {user.name} data.</span></p>
                    <hr />
                    <p>This can't be undone</p>
                </div>
                <div className={style["mid"]}>
                    <UserInput
                        setUserAge={setUserAgeInput}
                        setUserName={setUserNameInput}
                        userAge={userAgeInput}
                        userName={userNameInput}
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
                        onClickEvent={() => onClickEvent(userAgeInput, userNameInput)}
                        textContent="Confirm"
                        key={user.id}
                    />
                </div>
            </div>
        </div >)
}