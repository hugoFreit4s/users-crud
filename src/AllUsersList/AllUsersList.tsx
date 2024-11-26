import { User } from "../App";
import styles from "./AllUsersList.module.css";
import UserContainerInsideList from "../UserContainerInsideList/UserContainerInsideList";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

type AllUsersListProps = {
    closeModal: () => void;
    userList: Array<User>;
    deleteUser: (userID: string) => void;
    editUser: (user: User) => void;
};

export default function AllUsersList({ closeModal, userList, deleteUser, editUser }: AllUsersListProps) {
    const [contentClassName, setContentClassName] = useState<string>("");
    const [filteredUserList, setFilteredUserList] = useState<Array<User>>(userList);
    useEffect(() => {
        if (userList.length <= 0) {
            setContentClassName(`${styles.content} ${styles["content-1"]}`)
        } else {
            setContentClassName(styles.content)
        }
        setFilteredUserList(userList);
    }, [userList])
    return (
        <div className={styles.backdrop} onClick={() => closeModal()}>
            <div style={{ display: "flex", justifyContent: "end", width: "100%", height: "auto", padding: "0px 50px 0px 10px" }}>
                <div className={styles["close-modal-btn"]} onClick={() => closeModal()}>&#10005;</div>
            </div>
            <div className={styles[contentClassName]} onClick={e => e.stopPropagation()}>
                <div className={styles["inner-content"]}>
                    <div><p>Users: {userList.length}</p></div>
                    <div style={{ marginBottom: "10px" }}>
                        <SearchBar
                            searchFunction={word => {
                                setFilteredUserList(userList.filter(usertToShow => {
                                    return usertToShow.name.toLowerCase().includes(word.toLowerCase());
                                }));
                            }}
                        />
                    </div>
                    {filteredUserList.length > 0 ?
                        filteredUserList.map(user => {
                            return (
                                <UserContainerInsideList
                                    user={user}
                                    deleteUser={() => deleteUser(user.id)}
                                    key={user.id}
                                    editUser={(userToEdit) => editUser(userToEdit)}
                                />
                            );
                        }) : <p>Empty</p>}
                </div>
            </div>
        </div>
    );
}