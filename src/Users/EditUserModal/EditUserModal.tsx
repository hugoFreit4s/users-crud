import { useEffect, useState } from "react";
import { postUserDTO } from "../UsersPage/UsersPage";
import style from "./EditUserModal.module.css";
import EditUserForm from "../EditUserForm/EditUserForm";

type EditUserModalProps = {
    postUser: postUserDTO;
    cancelEdit: () => void;
    onClickEvent: (
        userAgeInput: string,
        userNameInput: string,
        userPhoneInput: string
    ) => void;
}

export default function EditUserModal({ postUser, cancelEdit, onClickEvent }: EditUserModalProps) {
    const [nameInput, setNameInput] = useState<string>('');
    const [birthDateInput, setBirthDateInput] = useState<Date | null>();
    const [phoneInput, setPhoneInput] = useState<string>('');

    useEffect(() => {
        setNameInput(postUser.name);
        setBirthDateInput(postUser.birthDate);
        setPhoneInput(postUser.phone);
    }, [])

    return (
        <div className={style.backdrop} onClick={cancelEdit} >
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <div className={style["top"]}>
                    <p><span style={{ color: "red" }}>Atention: You're editing {postUser.name} data.</span></p>
                    <hr />
                    <p>This can't be undone</p>
                </div>
                <div className={style["mid"]}>
                    <EditUserForm
                        setBirthDate={setBirthDateInput}
                        setName={setNameInput}
                        setPhone={setPhoneInput}
                        birthDate={birthDateInput != undefined ? birthDateInput : null}
                        name={nameInput}
                        phone={phoneInput}
                        cancelEdit={cancelEdit}
                        onClickEvent={onClickEvent}
                    />
                </div>
                <div className={style["bottom"]}>
                </div>
            </div>
        </div >)
}