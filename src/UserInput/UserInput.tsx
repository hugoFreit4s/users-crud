import style from "./UserInput.module.css";

type UserInputProps = {
    userName: string;
    setUserName: (name: string) => void;
    userAge: string;
    setUserAge: (age: string) => void;
    userPhone: string;
    setUserPhone: (phone: string) => void;
    userStreet: string;
    setUserStreet: (street: string) => void;
    userNeighborhood: string;
    setUserNeighborhood: (neighborhood: string) => void;
    userHouseNumber: number;
    setUserHouseNumber: (houserNumber: number) => void;
    userCity: string;
    setUserCity: (city: string) => void;
}

export default function UserInput({
    userName,
    setUserName,
    userAge,
    setUserAge,
    userPhone,
    setUserPhone,
    userStreet,
    setUserStreet,
    userNeighborhood,
    setUserNeighborhood,
    userHouseNumber,
    setUserHouseNumber,
    userCity,
    setUserCity
}: UserInputProps) {
    return (
        <div className={style["inputs-div"]}>
            <div className={style["single-input-div"]}>
                <p>Name</p>
                <input className={style["input-box"]} value={userName} type="text" onChange={e => setUserName(e.target.value)} />
            </div>
            <div className={style["single-input-div"]}>
                <p>Age</p>
                <input className={style["input-box"]} min={0} value={userAge} type="number" onChange={e => setUserAge(e.target.value)} />
            </div>
            <div className={style["single-input-div"]}>
                <p>Phone</p>
                <input className={style["input-box"]} value={userPhone} type="text" onChange={e => setUserPhone(e.target.value)} />
            </div>
            <div className={style["address-input-div"]}>
                <div className={style["street-input"]}>
                    <p>Street</p>
                    <input className={style["input-box"]} value={userStreet} type="text" onChange={e => setUserStreet(e.target.value)} />
                </div>
                <div className={style["neighborhood-input"]}>
                    <p>Neighborhood</p>
                    <input className={style["input-box"]} value={userNeighborhood} type="text" onChange={e => setUserNeighborhood(e.target.value)} />
                </div>
                <div className={style["house-number-input"]}>
                    <p>House Number</p>
                    <input className={style["input-box"]} min={0} value={userHouseNumber} type="number" onChange={e => setUserHouseNumber(Number(e.target.value))} />
                </div>
                <div className={style["city-input"]}>
                    <p>City</p>
                    <input className={style["input-box"]} value={userCity} type="text" onChange={e => setUserCity(e.target.value)} />
                </div>
            </div>
        </div>
    )
}