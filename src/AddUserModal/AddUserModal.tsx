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
    const [userPhone, setUserPhone] = useState<string>();
    const [userStreet, setUserStreet] = useState<string>();
    const [userNeighborhood, setUserNeighborhood] = useState<string>();
    const [userHouseNumber, setUserHouseNumber] = useState<number>();
    const [userCity, setUserCity] = useState<string>();
    return (
        <div className={"backdrop"} onClick={closeModal}>
            <div className={styles["content"]} onClick={e => e.stopPropagation()}>
                <div className={styles["top"]}></div>
                <UserInput
                    userName={userName!}
                    userAge={userAge!}
                    userPhone={userPhone!}
                    userStreet={userStreet!}
                    userNeighborhood={userNeighborhood!}
                    userHouseNumber={userHouseNumber!}
                    userCity={userCity!}
                    setUserName={(name) => setUserName(name)}
                    setUserAge={(age) => setUserAge(age.toString())}
                    setUserPhone={(phone) => setUserPhone(phone)}
                    setUserStreet={(street) => setUserStreet(street)}
                    setUserNeighborhood={(neighborhood) => setUserNeighborhood(neighborhood)}
                    setUserHouseNumber={(houseNumber) => setUserHouseNumber(houseNumber)}
                    setUserCity={(city) => setUserCity(city)}
                />
                <div className={styles["bottom"]}>
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            if (userName !== undefined
                                && userName !== null
                                && userName?.length > 0
                                && userAge !== undefined
                                && userPhone !== undefined
                                && userCity !== undefined
                                && userHouseNumber !== undefined
                                && userNeighborhood !== undefined
                                && userStreet !== undefined) {
                                insertUser({
                                    id: crypto.randomUUID(), name: userName, age: Number(userAge), phone: userPhone, address: {
                                        city: userCity, houseNumber: userHouseNumber, neighborhood: userNeighborhood, street: userStreet
                                    }
                                })
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