import { useEffect, useState } from "react"
import { User } from "../App"

type SearchBarProps = {
    usersList: Array<User>
    searchFunction: (searchedWord: string,) => void;
}
export default function SearchBar({ usersList, searchFunction }: SearchBarProps) {
    const [filteredList, setFilteredList] = useState<Array<User>>([]);
    return (
        <div>
            <div>
                <input type="text" placeholder="Insert user name here" onChange={e => searchFunction(e.target.value)} />
            </div>
            <div>P</div>
        </div>
    )
}