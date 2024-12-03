import style from "./UserInput.module.css";

type UserInputProps = {
    name: string;
    setName: (name: string) => void;
    age: string;
    setAge: (age: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
}

export default function UserInput({
    name,
    setName,
    age,
    setAge,
    phone,
    setPhone,
}: UserInputProps) {
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
        </div>
    )
}