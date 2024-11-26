import { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton"
import styles from "./UserContainerInsideList.module.css"
import { User } from "../App";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";

type UserContainerInsideListProps = {
    user: User;
    deleteUser: (userID: string) => void;
    editUser: (user: User) => void;
}

export default function UserContainerInsideList({ user, deleteUser, editUser }: UserContainerInsideListProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    return (
        <div className={styles.userDiv} key={user.id}>
            <div className={styles.top}>
                <img src="" alt="" />
                <p>{user.name}</p>
                <p>{user.age}</p>
            </div>
            <div className={styles.bottom}>
                <CustomButton
                    className="danger-btn"
                    onClickEvent={() => setIsDeleting(!isDeleting)}
                    textContent="Delete user"
                />
                {isDeleting &&
                    <DeleteUserModal
                        closeModal={() => setIsDeleting(!isDeleting)}
                        deleteUser={() => deleteUser(user.id)}
                        userName={user.name}
                        key={user.id}
                    />}
                <CustomButton
                    className="secondary-btn"
                    onClickEvent={() => setIsEditing(!isEditing)}
                    textContent="Edit user"
                />
                {isEditing &&
                    <EditUserModal
                        cancelEdit={() => setIsEditing(!isEditing)}
                        onClickEvent={(userAgeInput, userNameInput) => {
                            setIsEditing(!isEditing);
                            editUser({ ...user, age: Number(userAgeInput), name: userNameInput })
                        }}
                        user={user}
                    />
                }
            </div>
        </div>
    )
}