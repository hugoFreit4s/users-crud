import CustomButton from "../../CustomButton/CustomButton";
import { getCarDTO } from "../CarsPage/CarsPage"

type CarContainerProps = {
    car: getCarDTO;
}

export default function CarContainer({ car }: CarContainerProps) {
    return (
        <div>
            <p>Car: {car.name}</p>
            <p>Owner: {car.ownerName}</p>
            <p>Value: {car.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <CustomButton
                className="danger-btn"
                onClickEvent={() => { }}
                textContent="Delete"
                key={car.id}
            />
        </div>
    )
}