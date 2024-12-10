import CustomButton from "../../CustomButton/CustomButton";
import styles from "./DeleteUserModal.module.css";

type DeleteUserModalProps = {
    closeModal: () => void;
    userName: string;
    deleteUser: () => void;
}

export default function DeleteUserModal({ closeModal, userName, deleteUser }: DeleteUserModalProps) {
    return (
        <div className={styles["backdrop"]} onClick={closeModal}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
                <div className={styles.top}>
                    <p><strong>Do you really wanna delete {userName}?</strong></p>
                    <hr />
                    <p>This can't be undone.</p>
                </div>
                <div className={styles.bottom}>
                    <CustomButton
                        className="danger-btn"
                        onClickEvent={closeModal}
                        textContent="Cancel"
                    />
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={deleteUser}
                        textContent="Confirm"
                    />
                </div>
            </div>
        </div>
    )
}