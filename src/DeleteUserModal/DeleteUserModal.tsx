import CustomButton from "../CustomButton/CustomButton";
import styles from "./DeleteUserModal.module.css";

type DeleteUserModalProps = {
    closeModal: () => void;
    userName: string;
    deleteUser: () => void;
}

export default function DeleteUserModal({ closeModal, userName, deleteUser }: DeleteUserModalProps) {
    return (
        <div className={styles["backdrop-modal"]} onClick={closeModal}>
            <div className="content" onClick={e => e.stopPropagation()}>
                <div className="top">
                    <p><strong>Do you really wanna delete {userName}?</strong></p>
                    <hr />
                    <p>This can't be undone.</p>
                </div>
                <div className="bottom">
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={closeModal}
                        textContent="Cancel"
                    />
                    <CustomButton
                        className="danger-btn"
                        onClickEvent={deleteUser}
                        textContent="Confirm"
                    />
                </div>
            </div>
        </div>
    )
}