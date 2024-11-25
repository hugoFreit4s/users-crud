import { User } from "../App";
import CustomButton from "../CustomButton/CustomButton";
import "./AllUsersList.css";

type AllUsersListProps = {
    closeModal: () => void;
    userList: Array<User>;
}
export default function AllUsersList({ closeModal, userList }: AllUsersListProps) {
    return (
        <div className="backdrop" onClick={() => closeModal()}>
            <div style={{ width: "90%", display: "flex", justifyContent: "end", padding: "0 0 0 0" }}>
                <div className="close-modal-btn" onClick={() => closeModal()}>&#10005;</div>
            </div>

            <div className="content" onClick={e => e.stopPropagation()}>
                <div className="teste">
                    {userList.map(user => {
                        return (
                            <div className="user-div">
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
                        )
                    })}

                </div>
            </div>
        </div>
    )
}