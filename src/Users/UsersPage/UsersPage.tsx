import UserContainer from "./UserContainer";

export type postUserDTO = { id: null, name: string, gender: string, birthDate: string, phone: string };
export type getUserDTO = { id: number, name: string, gender: string, phone: string, age: number, birthDate: Date };

export default function UsersPage() {
    return (
        <main>
            <UserContainer user={{ id: 1, name: "Hugo", gender: "M", age: 21, birthDate: new Date(), phone: "3132357623" }} />
        </main>
    )
}