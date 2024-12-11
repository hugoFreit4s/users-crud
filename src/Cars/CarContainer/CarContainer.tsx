import CustomButton from "../../CustomButton/CustomButton";
import { getCarDTO } from "../CarsPage/CarsPage"
import { deleteCar } from "../../API";

type CarContainerProps = {
    car: getCarDTO;
    updateCars: (newCars: getCarDTO[]) => void;
}

async function callDeleteCar(id: number) {
    return await deleteCar(id);
}

export default function CarContainer({ car, updateCars }: CarContainerProps) {
    return (
        <div>
            <p>Car: {car.name}</p>
            <p>Owner: {car.ownerName}</p>
            <p>Value: {car.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <CustomButton
                className="danger-btn"
                onClickEvent={() => {
                    const fetchCars = async () => {
                        try {
                            const cars = await callDeleteCar(car.id);
                            updateCars(cars);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    fetchCars();
                }
                }
                textContent="Delete"
                key={car.id}
            />
        </div>
    )
}