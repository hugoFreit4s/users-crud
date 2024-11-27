import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { User } from "../App";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useState } from "react";
import style from "./UserContainer.module.css";
import CustomButton from "../CustomButton/CustomButton";
import profilepic from "../public/profile-pic.png";

type UserDivProps = {
    user: User;
    userName: string;
    userAge: number;
    userID: string;
    deleteUser: (userID: string) => void;
    onClickEvent: (user: User) => void;
}

export default function UserDiv({ user, deleteUser, onClickEvent }: UserDivProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    return (
        <div className={style["user-div"]}>
            <div className={style.top}>
                <img className={style["profile-picture"]} src={profilepic} />
                <p>{user.name}, {user.age}</p>
            </div>
            <div className={style.buttons}>
                <CustomButton
                    className="danger-btn"
                    onClickEvent={() => setIsDeleting(!isDeleting)}
                    textContent="Delete user"
                />
                <CustomButton
                    className="primary-btn"
                    onClickEvent={() => setIsEditing(!isEditing)}
                    textContent="&#9998;"
                />
            </div>
            {isDeleting && <DeleteUserModal
                closeModal={() => setIsDeleting(!isDeleting)}
                userName={user.name}
                deleteUser={() => deleteUser(user.id)}
                key={user.id}
            />}
            {isEditing &&
                <div>
                    <EditUserModal
                        user={user}
                        cancelEdit={() => setIsEditing(!isEditing)}
                        onClickEvent={(userAgeInput, userNameInput) => {
                            onClickEvent({ ...user, age: +userAgeInput, name: userNameInput })
                            setIsEditing(!isEditing);
                        }}
                        key={user.id}
                    />
                </div>}
        </div>
    )
}