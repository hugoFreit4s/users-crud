import { getUserDTO } from "../../Users/UsersPage/UsersPage";
import CarContainer from "../CarContainer/CarContainer";
import { getCarDTO } from "../CarsPage/CarsPage"
import style from "./AllCarsContainers.module.css";

type AllCarsListProps = {
    cars: Array<getCarDTO>;
    users: getUserDTO[];
    updateCars: (newCars: getCarDTO[]) => void;
}
export default function AllCarsContainer({ cars, users, updateCars }: AllCarsListProps) {
    return (
        <main className={style["main-content"]}>
            {cars.length > 0 &&
                cars.map(car => {
                    return (
                        <CarContainer
                            car={car}
                            updateCars={cars => updateCars(cars)}
                            key={car.id}
                            users={users}
                        />
                    )
                })}
            {cars.length <= 0 && <p>No registered cars</p>}
        </main>
    )
}