import { useState } from "react";
import { getUserDTO, postUserDTO } from "../UsersPage/AllUsersContainers";
import style from "./EditUserModal.module.css";
import CustomButton from "../CustomButton/CustomButton";
import ControlActionModal from "../ControlActionModal/ControlActionModal";
import { editUser } from "../../API";
type EditUserModalProps = {
    user: getUserDTO;
    closeModal: () => void;
    setUsers: (users: getUserDTO[]) => void;
}
export default function EditUserModal({ user, closeModal, setUsers }: EditUserModalProps) {
    const [userName, setUserName] = useState<string>(user.name);
    const [userGender, setUserGender] = useState<string>(user.gender);
    const [userPhone, setUserPhone] = useState<string>(user.phone);
    const [userBirthDate, setUserBirthDate] = useState<Date>(user.birthDate);
    const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState<boolean>(false);
    const [isConfirmEditOpen, setIsConfirmEditOpen] = useState<boolean>(false);

    const [users, setUsers] = useState<getUserDTO[]>();

    async function callEditUser(user: postUserDTO) {
        console.log(user);
        editUser(user);
    }

    return (
        <div className={style.backdrop} onClick={closeModal}>
            <div className={style.content} onClick={e => e.stopPropagation()}>
                <div className={style["close-button-div"]}>
                    <div className={style["close-button"]} onClick={closeModal}>X</div>
                </div>
                <div className={style["inner-content"]}>
                    <div>
                        <p className={style["primary-text"]}>Name:</p>
                        <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div>
                        <p className={style["primary-text"]}>Gender:</p>
                        <input type="text" maxLength={1} value={userGender} onChange={e => setUserGender(e.target.value)} />
                    </div>
                    <div>
                        <p className={style["primary-text"]}>Phone:</p>
                        <input type="text" value={userPhone} onChange={e => setUserPhone(e.target.value)} />
                    </div>
                    <div>
                        <p className={style["primary-text"]}>Birth date:</p>
                        <input type="date" value={userBirthDate.toString()} onChange={e => setUserBirthDate(new Date(e.target.value))} />
                    </div>
                </div>
                <div className={style.buttons}>
                    <CustomButton
                        action={() => { setIsConfirmCancelOpen(true) }}
                        category="secondary"
                        text="Cancel"
                    />
                    {isConfirmCancelOpen &&
                        <ControlActionModal
                            text="Do you want to cancel?spltAll changes will be lost."
                            cancelAction={() => setIsConfirmCancelOpen(false)}
                            confirmAction={() => {
                                setIsConfirmCancelOpen(false);
                                closeModal();
                            }}
                        />}
                    <CustomButton
                        action={() => { setIsConfirmEditOpen(true) }}
                        category="primary"
                        text="Confirm"
                    />
                    {isConfirmEditOpen &&
                        <ControlActionModal
                            text="Are you sure?spltThis can't be undone."
                            cancelAction={() => setIsConfirmEditOpen(false)}
                            confirmAction={() => {
                                const fetchUsers = async () => {
                                    const users = await callEditUser({ ...user, name: userName, birthDate: userBirthDate, gender: userGender, phone: userPhone });
                                    setUsers(users);
                                }
                                fetchUsers();
                                setIsConfirmEditOpen(false);
                                closeModal();
                            }}
                        />}
                </div>
            </div>
        </div>
    )
}