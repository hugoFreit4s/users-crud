import { useState } from "react";
import UserInput from "../UserInput/UserInput"
import styles from "./AddUserModal.module.css"
import CustomButton from "../CustomButton/CustomButton";
import { User } from "../App";

type AddUserModalProps = {
    closeModal: () => void;
    insertUser: (user: User) => void;
}

export default function AddUserModal({ closeModal, insertUser }: AddUserModalProps) {
    const [userName, setUserName] = useState<string>();
    const [userAge, setUserAge] = useState<string>();
    const [userPhone, setUserPhone] = useState<string>();
    return (
        <div className={"backdrop"} onClick={closeModal}>
            <div className={styles["content"]} onClick={e => e.stopPropagation()}>
                <div className={styles["top"]}></div>
                <UserInput
                    name={userName!}
                    age={userAge!}
                    phone={userPhone!}
                    setName={(name) => setUserName(name)}
                    setAge={(age) => setUserAge(age.toString())}
                    setPhone={(phone) => setUserPhone(phone)}
                />
                <div className={styles["bottom"]}>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            if (userName !== undefined
                                && userName !== null
                                && userName?.length > 0
                                && userAge !== undefined
                                && userPhone !== undefined) {
                                insertUser({ id: 0, name: userName, age: Number(userAge), phone: userPhone })
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