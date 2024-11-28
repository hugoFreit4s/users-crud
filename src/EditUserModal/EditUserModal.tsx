import { useEffect, useState } from "react";
import { Address, User } from "../App";
import CustomButton from "../CustomButton/CustomButton";
import UserInput from "../UserInput/UserInput";
import style from "./EditUserModal.module.css";

type EditUserModalProps = {
    user: User;
    cancelEdit: () => void;
    onClickEvent: (
        userAgeInput: string,
        userNameInput: string,
        userPhoneInput: string,
        userAddressInput: Address
    ) => void;
}

export default function EditUserModal({ user, cancelEdit, onClickEvent }: EditUserModalProps) {
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [userAgeInput, setUserAgeInput] = useState<string>('');
    const [userPhoneInput, setUserPhoneInput] = useState<string>('');
    const [userAddressInput, setUserAddressInput] = useState<Address>({ city: user.address.city, houseNumber: user.address.houseNumber, neighborhood: user.address.neighborhood, street: user.address.street })

    useEffect(() => {
        setUserNameInput(user.name);
        setUserAgeInput(user.age.toString());
        setUserPhoneInput(user.phone);
        setUserAddressInput(user.address)
    }, [])
    return (
        <div className={"backdrop"} onClick={cancelEdit} >
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <div className={style["top"]}>
                    <p><span style={{ color: "red" }}>Atention: You're editing {user.name} data.</span></p>
                    <hr />
                    <p>This can't be undone</p>
                </div>
                <div className={style["mid"]}>
                    <UserInput
                        setAge={setUserAgeInput}
                        setName={setUserNameInput}
                        setPhone={setUserPhoneInput}
                        setAddress={setUserAddressInput}
                        age={userAgeInput}
                        name={userNameInput}
                        phone={userPhoneInput}
                        address={userAddressInput}
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
                        onClickEvent={() => onClickEvent(userAgeInput, userNameInput, userPhoneInput, userAddressInput)}
                        textContent="Confirm"
                        key={user.id}
                    />
                </div>
            </div>
        </div >)
}