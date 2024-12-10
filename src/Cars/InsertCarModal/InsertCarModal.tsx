import CustomButton from "../../CustomButton/CustomButton";
import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import InsertCarForm from "../InsertCarForm/InsertCarForm";
import style from "./InsertCarModal.module.css";

type InsertCarModalProps = {
    users: Array<getUserDTO>;
    closeModal: () => void;
}

export default function InsertCarModal({ users, closeModal }: InsertCarModalProps) {
    return (
        <div className={style["backdrop"]} onClick={() => closeModal()}>
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <InsertCarForm users={users} />
            </div>
        </div>
    )
}