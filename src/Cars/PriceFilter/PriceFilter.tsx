import style from "./PriceFilter.module.css";
type PriceFilterProps = {
    setMinValue: (val: string) => void;
    setMaxValue: (val: string) => void;
    minValue: string | undefined;
    maxValue: string | undefined;
}
export default function PriceFilter({ minValue, maxValue, setMinValue, setMaxValue }: PriceFilterProps) {
    return (
        <div className={style.main}>
            <div className={style["input-container"]}>
                <label>Minimum value</label>
                <input type="number" value={minValue} onChange={e => setMinValue(e.target.value)} className={style["input-box"]} />
            </div>
            <div className={style["input-container"]}>
                <label>Maximum value</label>
                <input type="number" value={maxValue} onChange={e => setMaxValue(e.target.value)} className={style["input-box"]} />
            </div>
        </div>
    )
}