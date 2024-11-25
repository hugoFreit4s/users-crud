import "./UserInput.css";

type UserInputProps = {
    userName: string;
    userAge: string;
    setUserName: (name: string) => void;
    setUserAge: (age: string) => void;
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
                <input min={0} value={userAge} type="string" onChange={e => setUserAge(e.target.value)} />
            </div>
        </div>
    )
}