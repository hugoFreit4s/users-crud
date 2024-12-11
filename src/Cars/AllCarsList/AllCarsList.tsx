import CarContainer from "../CarContainer/CarContainer";
import { getCarDTO } from "../CarsPage/CarsPage"

type AllCarsListProps = {
    cars: Array<getCarDTO>;
}
export default function AllCarsList({ cars }: AllCarsListProps) {
    return (
        <main>
            {cars.length > 0 &&
                cars.map(car => {
                    return <CarContainer car={car} key={car.id}></CarContainer>
                })}
            {cars.length <= 0 && <p>No registered cars</p>}
        </main>
    )
}