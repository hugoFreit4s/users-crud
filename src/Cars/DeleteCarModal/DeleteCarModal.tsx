import { deleteCar } from "../../API";
import CustomButton from "../../CustomButton/CustomButton";
import { getCarDTO } from "../CarsPage/CarsPage";
import style from "./DeleteCarModal.module.css";

type DeleteCarModalProps = {
    car: getCarDTO;
    closeModal: () => void;
    updateCars: (newCars: getCarDTO[]) => void;
}

async function callDeleteCar(id: number) {
    return await deleteCar(id);
}

export default function DeleteCarModal({ car, closeModal, updateCars }: DeleteCarModalProps) {
    return (
        <div className={style["backdrop"]} onClick={closeModal}>
            <div className={style["content"]} onClick={e => e.stopPropagation()}>
                <div className={style["top"]}>
                    <p>You are deleting car {car.name}, from owner {car.ownerName}, do you want to continue?</p>
                </div>
                <div style={{ width: "100%" }}>
                    <hr />
                </div>
                <div className={style["mid"]}>
                    <span>This action can't be undone!</span>
                </div>
                <div className={style["bottom"]}>
                    <CustomButton
                        className="secondary-btn"
                        onClickEvent={closeModal}
                        textContent="Cancel"
                        key={crypto.randomUUID()}
                    />
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
                            closeModal();
                        }}
                        textContent="Confirm"
                        key={car.id}
                    />
                </div>
            </div>
        </div>
    )
}