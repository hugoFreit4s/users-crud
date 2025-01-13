import style from "./UserContainer.module.css";
import { getUserDTO } from "./UsersPage";
import profilePic from "../../public/profile-pic.png";
import CustomButton from "../CustomButton/CustomButton";

type UserContainerProps = {
    user: getUserDTO;
}
export default function UserContainer({ user }: UserContainerProps) {
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
                    action={() => { }}
                    category="primary"
                    text="Edit user"
                    key={user.id}
                />
                <CustomButton
                    action={() => { }}
                    category="warning"
                    text="Delete user"
                    key={user.id}
                />
            </div>
        </div>
    )
}