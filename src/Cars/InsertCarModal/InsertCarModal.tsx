import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import { getCarDTO } from "../CarsPage/CarsPage";
import InsertCarForm from "../InsertCarForm/InsertCarForm";
import style from "./InsertCarModal.module.css";

type InsertCarModalProps = {
    users: Array<getUserDTO>;
    updateCars: (newCars: getCarDTO[]) => void;
    closeModal: () => void;
}

export default function InsertCarModal({ users, updateCars, closeModal }: InsertCarModalProps) {
    return (
        <div className={style["backdrop"]} onClick={() => closeModal()}>
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <InsertCarForm
                    users={users}
                    updateCars={updateCars}
                    closeModal={closeModal}
                />
            </div>
        </div>
    )
}