import CustomButton from "../../CustomButton/CustomButton";
import { getCarDTO } from "../CarsPage/CarsPage"
import { useState } from "react";
import DeleteCarModal from "../DeleteCarModal/DeleteCarModal";

type CarContainerProps = {
    car: getCarDTO;
    updateCars: (newCars: getCarDTO[]) => void;
}

export default function CarContainer({ car, updateCars }: CarContainerProps) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    return (
        <div>
            <p>Car: {car.name}</p>
            <p>Owner: {car.ownerName}</p>
            <p>Value: {car.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
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
        </div>
    )
}