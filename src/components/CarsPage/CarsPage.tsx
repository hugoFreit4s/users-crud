import { postUserDTO } from "../../components/UsersPage/UsersPage";

export type getCarDTO = { id: number, manufactureYear: number, brand: string, modelName: string, ownerName: string, name: string, value: number };
export type postCarDTO = { id: null | number, manufactureYear: number, brand: string, modelName: string, value: number, owner: postUserDTO };

export default function CarsPage() {
    return (
        <main>
            
        </main>
    )
}