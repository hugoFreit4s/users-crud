import style from "./SearchBar.module.css"
type SearchBarProps = {
    searchFunction: (searchedWord: string,) => void;
}
export default function SearchBar({ searchFunction }: SearchBarProps) {
    return (
        <div className={style["search-bar-body"]}>
            <div>
                <input type="text" placeholder="Insert user name here" onChange={e => searchFunction(e.target.value)} />
            </div>
            <div>&#128269;</div>
        </div>
    )
}