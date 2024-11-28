import { useEffect, useState } from "react";
import { Address } from "../App";
import style from "./UserInput.module.css";

type UserInputProps = {
    name: string;
    setName: (name: string) => void;
    age: string;
    setAge: (age: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    address: Address;
    setAddress: (address: Address) => void;
}

export default function UserInput({
    name,
    setName,
    age,
    setAge,
    phone,
    setPhone,
    address,
    setAddress
}: UserInputProps) {
    const [street, setStreet] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [houseNumber, setHouserNumber] = useState<number>(0);
    const [neighborhood, setNeighborhood] = useState<string>('');

    useEffect(() => {
        setAddress({ street: street, city: city, houseNumber: houseNumber, neighborhood: neighborhood })
    }, [street, city, houseNumber, neighborhood])
    return (
        <div className={style["inputs-div"]}>
            <div className={style["top-div"]}>
                <div className={style["single-input-div"]}>
                    <p>Name</p>
                    <input className={style["input-box"]} value={name} type="text" onChange={e => setName(e.target.value)} />
                </div>
                <div className={style["single-input-div"]}>
                    <p>Age</p>
                    <input className={style["input-box"]} min={0} value={age} type="number" onChange={e => setAge(e.target.value)} />
                </div>
                <div className={style["single-input-div"]}>
                    <p>Phone</p>
                    <input className={style["input-box"]} value={phone} type="text" onChange={e => setPhone(e.target.value)} />
                </div>
            </div>
            <div className={style["address-input-div"]}>
                <div className={style["street-input"]}>
                    <p>Street</p>
                    <input className={style["input-box"]} value={address.street} type="text" onChange={e => setStreet(e.target.value)} />
                </div>
                <div className={style["neighborhood-input"]}>
                    <p>Neighborhood</p>
                    <input className={style["input-box"]} value={address.neighborhood} type="text" onChange={e => setNeighborhood(e.target.value)} />
                </div>
                <div className={style["house-number-input"]}>
                    <p>House Number</p>
                    <input className={style["input-box"]} min={0} value={address.houseNumber} type="number" onChange={e => setHouserNumber(Number(e.target.value))} />
                </div>
                <div className={style["city-input"]}>
                    <p>City</p>
                    <input className={style["input-box"]} value={address.city} type="text" onChange={e => setCity(e.target.value)} />
                </div>
            </div>
        </div>
    )
}