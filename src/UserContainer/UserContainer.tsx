import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { User } from "../App";
import EditUserModal from "../EditUserModal/EditUserModal";
import { useState } from "react";

type UserDivProps = {
    user: User;
    userName: string;
    userAge: number;
    userID: string;
    deleteUser: (userID: string) => void;
    setUserName: (name: string) => void; ///!!!!
    setUserAge: (age: number) => void; ///!!!!
    onClickEvent: (user: User) => void;
}

export default function UserDiv({ user, deleteUser, onClickEvent }: UserDivProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    return (
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
            <button onClick={() => setIsDeleting(!isDeleting)}>del</button>
            {isDeleting && <DeleteUserModal
                closeModal={() => setIsDeleting(!isDeleting)}
                userName={user.name}
                deleteUser={() => deleteUser(user.id)}
                key={user.id}
            />}
            <button onClick={() => {
                setIsEditing(!isEditing);
            }}>edt</button>
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