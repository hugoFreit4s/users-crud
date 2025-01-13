import style from "./UserContainer.module.css";
import { getUserDTO } from "./UsersPage";
import profilePic from "../../public/profile-pic.png";
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
                    <p>{user.name}</p>
                    <p>Phone: {user.phone}</p>
                </div>
            </div>
            <hr />
            <div className={style.bottom}>
                <button>edit</button>
                <button>delete</button>
            </div>
        </div>
    )
}