import CarContainer from "../CarContainer/CarContainer";
import { getCarDTO } from "../CarsPage/CarsPage"

type AllCarsListProps = {
    cars: Array<getCarDTO>;
    updateCars: (newCars: getCarDTO[]) => void;
}
export default function AllCarsContainer({ cars, updateCars }: AllCarsListProps) {
    return (
        <main>
            {cars.length > 0 &&
                cars.map(car => {
                    return (
                        <CarContainer
                            car={car}
                            updateCars={cars => updateCars(cars)}
                            key={car.id}
                        />
                    )
                })}
            {cars.length <= 0 && <p>No registered cars</p>}
        </main>
    )
}