import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton"
import styles from "./UserContainerInsideList.module.css"
import { User } from "../App";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import EditUserModal from "../EditUserModal/EditUserModal";
import profilepic from "../public/profile-pic.png";

type UserContainerInsideListProps = {
    user: User;
    deleteUser: (userID: number) => void;
    editUser: (user: User) => void;
}

export default function UserContainerInsideList({ user, deleteUser, editUser }: UserContainerInsideListProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    return (
        <div className={styles["user-div"]} key={user.id}>
            <div className={styles.top}>
                <img className={styles["profile-picture"]} src={profilepic} />
                <div>{user.name}</div>
                <div>{user.age} years</div>
                <div>&#x1F4DE; {user.phone}</div>
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
                        onClickEvent={(userAgeInput, userNameInput, userPhoneInput) => {
                            setIsEditing(!isEditing);
                            editUser({ ...user, age: Number(userAgeInput), name: userNameInput, phone: userPhoneInput })
                        }}
                        user={user}
                    />
                }
            </div>
        </div>
    )
}