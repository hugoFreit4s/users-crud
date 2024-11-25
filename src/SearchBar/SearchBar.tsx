import { useState } from "react"
import { User } from "../App"

type SearchBarProps = {
    usersList: Array<User>
}
export default function SearchBar({ usersList }: SearchBarProps) {
    const [searchedWord, setSearchedWord] = useState<string>("");
    return (
        <div>
            <div>
                <input type="text" placeholder="Insert user name here" onChange={(e) => {
                    setSearchedWord(e.target.value)
                    const newList = usersList.filter(user => {
                        return user.name.slice(0, searchedWord.length) === searchedWord;
                    })
                    console.log(newList)
                }} />
            </div>
            <div>P</div>
        </div>
    )
}