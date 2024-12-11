import CustomButton from "../../CustomButton/CustomButton";
import { getCarDTO } from "../CarsPage/CarsPage"
import { useState } from "react";
import DeleteCarModal from "../DeleteCarModal/DeleteCarModal";
import style from "./CarContainer.module.css";
import EditCarModal from "../EditCarModal/EditCarModal";
import { getUserDTO } from "../../Users/UsersPage/UsersPage";

type CarContainerProps = {
    car: getCarDTO;
    updateCars: (newCars: getCarDTO[]) => void;
    users: getUserDTO[];
}

export default function CarContainer({ car, updateCars, users }: CarContainerProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    return (
        <div className={style["container"]}>
            <div className={style.data}>
                <p>Car: {car.name}</p>
                <p>Owner: {car.ownerName}</p>
                <p>Value: {car.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            </div>
            <div className={style.buttons}>
                <CustomButton
                    className="danger-btn"
                    onClickEvent={() => setIsDeleteModalOpen(true)}
                    textContent="Delete"
                    key={car.id}
                />
                {isDeleteModalOpen &&
                    <DeleteCarModal
                        car={car}
                        closeModal={() => setIsDeleteModalOpen(false)}
                        updateCars={newCars => updateCars(newCars)}
                        key={crypto.randomUUID()}
                    />}
                <CustomButton
                    className="secondary-btn"
                    onClickEvent={() => setIsEditModalOpen(true)}
                    textContent="Edit"
                    key={crypto.randomUUID()}
                />
                {isEditModalOpen &&
                    <EditCarModal
                        closeModal={() => setIsEditModalOpen(false)}
                        car={car}
                        users={users}
                        updateCars={cars => updateCars(cars)}
                    />}
            </div>
        </div>
    )
}