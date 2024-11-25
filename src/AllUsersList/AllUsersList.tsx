import { User } from "../App";
import styles from "./AllUsersList.module.css";
import UserContainerInsideList from "../UserContainerInsideList/UserContainerInsideList";

type AllUsersListProps = {
    closeModal: () => void;
    userList: Array<User>;
    deleteUser: (userID: string) => void;
    editUser: (user: User) => void;
};

export default function AllUsersList({ closeModal, userList, deleteUser, editUser }: AllUsersListProps) {

    return (
        <div className={styles.backdrop} onClick={() => closeModal()}>
            <div style={{ width: "90%", display: "flex", justifyContent: "end", padding: "0 0 0 0" }}>
                <div className={styles["close-modal-btn"]} onClick={() => closeModal()}>&#10005;</div>
            </div>

            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <div className={styles["inner-content"]}>
                    {userList.length > 0 ?
                        userList.map(user => {
                            return (
                                <UserContainerInsideList
                                    user={user}
                                    deleteUser={deleteUser}
                                    editUser={editUser}
                                    key={user.id}
                                />
                            );
                        }) : <p>Empty</p>}
                </div>
            </div>
        </div>
    );
}