import "./UserInput.css";

type UserInputProps = {
    userName: string;
    userAge: string;
    setUserName: (name: string) => void;
    setUserAge: (age: number) => void;
}

export default function UserInput({ userName, setUserName, userAge, setUserAge }: UserInputProps) {
    return (
        <div className="inputs-div">
            <div className="single-input-div">
                <p>Name</p>
                <input value={userName} type="text" onChange={e => setUserName(e.target.value)} />
            </div>
            <div className="single-input-div">
                <p>Age</p>
                <input min={0} value={userAge} type="string" name="user_age_input" id="user_age_input" onChange={e => setUserAge(Number(e.target.value))} />
            </div>
        </div>
    )
}