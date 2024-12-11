import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import { getCarDTO } from "../CarsPage/CarsPage";
import EditCarForm from "../EditCarForm/EditCarForm";
import style from "./EditCarModal.module.css";

type EditCarModalProps = {
    closeModal: () => void;
    car: getCarDTO;
    users: getUserDTO[];
    updateCars: (cars: getCarDTO[]) => void;
}

export default function EditCarModal({ closeModal, car, users, updateCars }: EditCarModalProps) {
    return (
        <div className={style["backdrop"]} onClick={closeModal}>
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <EditCarForm
                    car={car}
                    users={users}
                    closeModal={() => closeModal()}
                    updateCars={cars => updateCars(cars)}
                />
            </div>
        </div>
    )
}