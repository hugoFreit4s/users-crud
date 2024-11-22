import { useState } from "react";
import UserInput from "./UserInput";
import CustomButton from "./CustomButton";

type UserDivProps = {
    currentUserName: string;
    currentUserAge: number;
    userName: string;
    userAge: string;
    userID: string;
    deleteUser: (userID: string) => void;
    setUserName: (name: string) => void; ///!!!!
    setUserAge: (age: number) => void; ///!!!!
    onClickEvent: () => void;
}

export default function UserDiv({ currentUserName, userName, currentUserAge, userAge, userID, deleteUser, setUserName, setUserAge, onClickEvent }: UserDivProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    return (
        <div>
            <p>{currentUserName}</p>
            <p>{currentUserAge}</p>
            <button onClick={() => deleteUser(userID)}>del</button>
            <button onClick={() => {
                setIsEditing(!isEditing);
            }}>edt</button>
            {isEditing &&
                <div>
                    <UserInput
                        setUserAge={setUserAge}
                        setUserName={setUserName}
                        userAge={userAge}
                        userName={userName}
                    />
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => {
                            onClickEvent();
                            setIsEditing(!isEditing);
                        }}
                        textContent='Edit User'
                    />
                </div>}
        </div>
    )
}