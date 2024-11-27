import style from "./UserInput.module.css";

type UserInputProps = {
    userName: string;
    userAge: string;
    setUserName: (name: string) => void;
    setUserAge: (age: string) => void;
}

export default function UserInput({ userName, setUserName, userAge, setUserAge }: UserInputProps) {
    return (
        <div className={style["inputs-div"]}>
            <div className={style["single-input-div"]}>
                <p>Name</p>
                <input className={style["input-box"]} value={userName} type="text" onChange={e => setUserName(e.target.value)} />
            </div>
            <div className={style["single-input-div"]}>
                <p>Age</p>
                <input className={style["input-box"]} min={0} value={userAge} type="string" onChange={e => setUserAge(e.target.value)} />
            </div>
        </div>
    )
}