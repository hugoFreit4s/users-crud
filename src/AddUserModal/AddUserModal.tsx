import InsertUserInput from "../InsertUserForm/InsertUserForm"
import styles from "./AddUserModal.module.css"
import { User } from "../App";

type AddUserModalProps = {
    closeModal: () => void;
    insertUser: (user: User) => void;
}

export default function AddUserModal({ closeModal, insertUser }: AddUserModalProps) {
    return (
        <div className={styles["backdrop"]} onClick={closeModal}>
            <div className={styles["content"]} onClick={e => e.stopPropagation()}>
                <div className={styles["top"]}></div>
                <InsertUserInput
                    insertUser={user => insertUser(user)}
                />
            </div>
        </div>
    )
}