import style from "./UserContainer.module.css";
import { getUserDTO } from "./AllUsersContainers";
import profilePic from "../../public/profile-pic.png";
import CustomButton from "../CustomButton/CustomButton";
import { useState } from "react";
import EditUserModal from "../EditUserModal/EditUserModal";

type UserContainerProps = {
    user: getUserDTO;
    refreshUsers: () => void;
}
export default function UserContainer({ user, refreshUsers }: UserContainerProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isConfirmEditModal, setIsConfirmEditModal] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isConfirmDeleteModal, setIsConfirmDeleteModal] = useState<boolean>(false);

    return (
        <div className={style.outside}>
            <div className={style.top}>
                <div className={style["top-left"]}>
                    <img src={profilePic} />
                </div>
                <div className={style["top-right"]}>
                    <p className={style["primary-text"]}>{user.name}</p>
                    <p className={style["secondary-text"]}>Phone: {user.phone}</p>
                    <p className={style["secondary-text"]}>Age: {user.age}</p>
                </div>
            </div>
            <hr />
            <div className={style.bottom}>
                <CustomButton
                    action={() => { setIsEditModalOpen(true) }}
                    category="primary"
                    text="Edit user"
                />
                {isEditModalOpen && <EditUserModal
                    user={user}
                    closeModal={() => setIsEditModalOpen(false)}
                    refreshUsers={() => refreshUsers()}
                    key={user.id}
                />}
                <CustomButton
                    action={() => { }}
                    category="warning"
                    text="Delete user"
                />
            </div>
        </div>
    )
}