import { getUserDTO, postUserDTO } from "../App";
import styles from "./AllUsersList.module.css";
import UserContainerInsideList from "../UserContainerInsideList/UserContainerInsideList";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

type AllUsersListProps = {
    closeModal: () => void;
    userList: Array<getUserDTO>;
    deleteUser: (userID: number) => void;
    editUser: (user: postUserDTO) => void;
};

export default function AllUsersList({ closeModal, userList, deleteUser, editUser }: AllUsersListProps) {
    const [contentClassName, setContentClassName] = useState<string>("");
    const [filteredUserList, setFilteredUserList] = useState<Array<getUserDTO>>(userList);
    useEffect(() => {
        if (userList.length <= 0) {
            setContentClassName(`${styles.emptyContent}`)
        } else {
            setContentClassName(`${styles.content}`)
        }
        setFilteredUserList(userList);
    }, [userList])
    return (
        <div className={styles.backdrop} onClick={() => closeModal()}>
            <div style={{ display: "flex", justifyContent: "end", width: "100%", height: "auto", padding: "0px 50px 0px 10px" }}>
                <div className={styles["close-modal-btn"]} onClick={() => closeModal()}>&#10005;</div>
            </div>
            <div className={styles["content"]} onClick={e => e.stopPropagation()}>
                <div className={`${styles[contentClassName]} ${styles["inner-content"]}`}>
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
                        <div className={styles["users-containers"]}>
                            {filteredUserList.map(user => {
                                return (
                                    <UserContainerInsideList
                                        user={user}
                                        postUser={{ birthDate: null, gender: user.gender, id: user.id, name: user.name, phone: user.phone }}
                                        deleteUser={() => deleteUser(user.id)}
                                        key={user.id}
                                        editUser={(userToEdit) => editUser(userToEdit)}
                                    />
                                );
                            })}
                        </div> : <p>No users</p>
                    }
                </div>
            </div>
        </div>
    );
}