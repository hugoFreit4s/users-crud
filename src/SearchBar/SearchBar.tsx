type SearchBarProps = {
    searchFunction: (searchedWord: string,) => void;
}
export default function SearchBar({ searchFunction }: SearchBarProps) {
    return (
        <div>
            <div>
                <input type="text" placeholder="Insert user name here" onChange={e => searchFunction(e.target.value)} />
            </div>
            <div>P</div>
        </div>
    )
}