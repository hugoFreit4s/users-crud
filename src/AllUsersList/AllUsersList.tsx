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
    const [searchedWord, setSearchedWord] = useState<string>("");
    useEffect(() => {
        if (userList.length <= 0) {
            setContentClassName(`${styles.content} ${styles["content-1"]}`)
        } else {
            setContentClassName(styles.content)
        }
    }, [userList])
    return (
        <div className={styles.backdrop} onClick={() => closeModal()}>
            <div style={{ width: "90%", display: "flex", justifyContent: "end" }}>
                <div className={styles["close-modal-btn"]} onClick={() => closeModal()}>&#10005;</div>
            </div>

            <div className={contentClassName} onClick={e => e.stopPropagation()}>
                <div className={styles["inner-content"]}>
                    <div><p>Users: {userList.length}</p></div>
                    <SearchBar
                        usersList={userList}
                        searchFunction={word => {
                            setSearchedWord(word);
                            setFilteredUserList(userList.filter(usertToShow => {
                                return usertToShow.name.toLowerCase().includes(searchedWord.toLowerCase());
                            }));
                        }}
                    />
                    {userList.length <= 0 ?
                        filteredUserList.map(user => {
                            return (
                                <UserContainerInsideList
                                    user={user}
                                    deleteUser={() => {
                                        deleteUser(user.id);
                                        setSearchedWord('');
                                    }}
                                    editUser={() => {
                                        editUser(user);
                                        setSearchedWord('');
                                    }}
                                    key={user.id}
                                />
                            );
                        }) : <p>Empty</p>}
                </div>
            </div>
        </div>
    );
}