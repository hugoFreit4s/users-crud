import { createContext, useState } from "react";

type User = {
    id: number | null,
    name: string,
    gender: string,
    birthDate: string | Date | null,
    age: number,
    phone: string
}

type UserContext = {
    user: User,
    setUserID: (id: number | null) => void;
    setUserName: (name: string) => void;
    setUserGender: (gender: string) => void;
    setUserBirthDate: (birthDate: string | Date | null) => void;
    setUserAge: (age: number) => void;
    setUserPhone: (phone: string) => void;
}

export const userContext = createContext<UserContext>({} as UserContext);

type Props = {
    children: React.ReactNode;
}

export default function UserProvider({ children }: Props) {
    const [user, setUser] = useState<User>({} as User);

    function setUserID(id: number | null) {
        setUser(prev => {
            return { ...prev, id: id }
        });
    }

    function setUserName(name: string) {
        setUser(prev => {
            return { ...prev, name: name }
        });
    }

    function setUserGender(gender: string) {
        setUser(prev => {
            return { ...prev, gender: gender }
        });
    }

    function setUserBirthDate(birthDate: string | Date | null) {
        setUser(prev => {
            return { ...prev, birthDate: birthDate }
        });
    }

    function setUserAge(age: number) {
        setUser(prev => {
            return { ...prev, age: age }
        });
    }

    function setUserPhone(phone: string) {
        setUser(prev => {
            return { ...prev, phone: phone }
        });
    }

    return <userContext.Provider value={
        {
            user: user,
            setUserID: setUserID,
            setUserName: setUserName,
            setUserGender: setUserGender,
            setUserBirthDate: setUserBirthDate,
            setUserAge: setUserAge,
            setUserPhone: setUserPhone
        }}>{children}
    </userContext.Provider>
}