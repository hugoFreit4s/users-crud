import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { getUserDTO, postUserDTO } from "../App";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useState } from "react";
import style from "./UserContainer.module.css";
import CustomButton from "../CustomButton/CustomButton";
import profilepic from "../public/profile-pic.png";

type UserDivProps = {
    user: getUserDTO;
    postUser: postUserDTO;
    userName: string;
    userAge: number;
    userID: number;
    deleteUser: (userID: number) => void;
    onClickEvent: (user: postUserDTO) => void;
}

export default function UserDiv({ user, postUser, deleteUser, onClickEvent }: UserDivProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    return (
        <div className={style["user-div"]}>
            <div className={style["user-div-inner"]}>
                <div className={style.top}>
                    <img className={style["profile-picture"]} src={profilepic} />
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", lineHeight: "10px" }}>
                        <p className={style["name"]}>{user.name}</p>
                        <p className={style["name"]}>Age: {user.age} years</p>
                    </div>
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
            </div>
            {isDeleting && <DeleteUserModal
                closeModal={() => setIsDeleting(!isDeleting)}
                userName={user.name}
                deleteUser={() => deleteUser(user.id!)}
                key={user.id}
            />}
            {isEditing &&
                <div>
                    <EditUserModal
                        postUser={postUser}
                        cancelEdit={() => setIsEditing(!isEditing)}
                        onClickEvent={(userBirthInput, userNameInput, userPhoneInput) => {
                            onClickEvent({ ...user, birthDate: new Date(userBirthInput), name: userNameInput, phone: userPhoneInput })
                            setIsEditing(!isEditing);
                        }}
                        key={user.id}
                    />
                </div>}
        </div>
    )
}