import InsertUserInput from "../InsertUserForm/InsertUserForm"
import styles from "./InsertUserModal.module.css"
import { postUserDTO } from "../UsersPage/UsersPage";

type AddUserModalProps = {
    closeModal: () => void;
    insertUser: (user: postUserDTO) => void;
}

export default function InsertUserModal({ closeModal, insertUser }: AddUserModalProps) {
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