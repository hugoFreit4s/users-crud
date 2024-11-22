type UserInputProps = {
    userName: string;
    userAge: string;
    setUserName: (name: string) => void;
    setUserAge: (age: number) => void;
}

export default function UserInput({ userName, setUserName, userAge, setUserAge }: UserInputProps) {
    return (
        <div>
            <input value={userName} type="text" onChange={e => setUserName(e.target.value)} />
            <input min={0} value={userAge} type="string" name="user_age_input" id="user_age_input" onChange={e => setUserAge(Number(e.target.value))} />
        </div>
    )
}