import { useEffect, useState } from "react";
import UserInput from "../UserInput/UserInput";
import CustomButton from "../CustomButton/CustomButton";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { User } from "../App";

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
    const [userNameInput, setUserNameInput] = useState<string>('');
    const [userAgeInput, setUserAgeInput] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    
    useEffect(() => {
        setUserNameInput(user.name);
        setUserAgeInput(user.age.toString());
    }, [])

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
                    <UserInput
                        setUserAge={setUserAgeInput}
                        setUserName={setUserNameInput}
                        userAge={userAgeInput}
                        userName={userNameInput}
                    />
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            onClickEvent({ ...user, age: +userAgeInput, name: userNameInput });
                            setIsEditing(!isEditing);
                        }}
                        textContent='Edit User'
                    />
                </div>}
        </div>
    )
}