import { User } from "../App";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./AllUsersList.module.css";

type AllUsersListProps = {
    closeModal: () => void;
    userList: Array<User>;
};

export default function AllUsersList({ closeModal, userList }: AllUsersListProps) {
    return (
        <div className={styles.backdrop} onClick={() => closeModal()}>
            <div style={{ width: "90%", display: "flex", justifyContent: "end", padding: "0 0 0 0" }}>
                <div className={styles.closeModalBtn} onClick={() => closeModal()}>&#10005;</div>
            </div>

            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <div className={styles["inner-content"]}>
                    {userList.map(user => {
                        return (
                            <div className={styles.userDiv} key={user.id}>
                                <div className={styles.top}>
                                    <img src="" alt="" />
                                    <p>{user.name}</p>
                                    <p>{user.age}</p>
                                </div>
                                <div className={styles.bottom}>
                                    <CustomButton
                                        className="danger-btn"
                                        onClickEvent={() => { }}
                                        textContent="Delete user"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}