import { useState } from "react";
import UserInput from "../UserInput/UserInput"
import styles from "./AddUserModal.module.css"
import CustomButton from "../CustomButton/CustomButton";
import { User } from "../App";
import ToastMessage from "../ToastMessage/ToastMessage";

type AddUserModalProps = {
    closeModal: () => void;
    insertUser: (user: User) => void;
}

export default function AddUserModal({ closeModal, insertUser }: AddUserModalProps) {
    const [userName, setUserName] = useState<string>();
    const [userAge, setUserAge] = useState<string>();
    return (
        <div className={"backdrop"} onClick={closeModal}>
            <div className={styles["content"]} onClick={e => e.stopPropagation()}>
                <div className={styles["top"]}></div>
                <UserInput
                    userName={userName!}
                    userAge={userAge!}
                    setUserName={(name) => setUserName(name)}
                    setUserAge={(age) => setUserAge(age.toString())}
                />
                <div className={styles["bottom"]}>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            if (userName !== undefined && userName !== null && userName?.length > 0 && userAge !== undefined) {
                                insertUser({ id: crypto.randomUUID(), name: userName, age: Number(userAge) })
                                setUserName('');
                                setUserAge('')
                            }
                        }}
                        textContent='Insert User'
                    />
                </div>
            </div>
        </div>
    )
}