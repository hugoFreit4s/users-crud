import { User } from "./App";
import CustomButton from "./CustomButton";
import "./AllUsersList.css";

type AllUsersListProps = {
    closeModal: () => void;
    user: User;
}
export default function AllUsersList({ closeModal, user }: AllUsersListProps) {
    return (
        <div className="backdrop" onClick={() => closeModal()}>
            <div className="close-modal-btn" onClick={() => closeModal()}>X</div>
            <div className="content" onClick={e => e.stopPropagation()}>
                <div className="top">
                    <img src="" alt="" />
                    <p>{user.name}</p>
                    <p>{user.age}</p>
                </div>
                <div className="bottom">
                    <CustomButton
                        className="danger-btn"
                        onClickEvent={() => { }}
                        textContent="Delete user"
                        key={user.id}
                    />
                </div>
            </div>
        </div>
    )
}