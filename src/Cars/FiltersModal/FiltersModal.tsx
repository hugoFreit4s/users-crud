import CustomButton from "../../CustomButton/CustomButton";
import BrandFilter from "../BrandFilter/BrandFilter";
import PriceFilter from "../PriceFilter/PriceFilter";
import style from "./FiltersModal.module.css";
type FiltersProps = {
    setBrand: (val: string) => void;
    brand: string;
    brands: string[];
    setMinValue: (val: string | undefined) => void;
    setMaxValue: (val: string | undefined) => void;
    minValue: string | undefined;
    maxValue: string | undefined;
    clearFiltersFunction: () => void;
    filterFunction: () => void;
    closeModal: () => void;
}
export default function FiltersModal({ setBrand, brand, brands, setMinValue, setMaxValue, minValue, maxValue, clearFiltersFunction, filterFunction, closeModal }: FiltersProps) {
    return (
        <div className={style.backdrop} onClick={closeModal}>
            <div className={style.content} onClick={e => e.stopPropagation()}>
                <div className={style.top}>
                    <BrandFilter
                        brand={brand}
                        brands={brands}
                        setBrand={brand => setBrand(brand)}
                    />
                </div>
                <div className={style.mid}>
                    <PriceFilter
                        minValue={minValue}
                        maxValue={maxValue}
                        setMinValue={val => setMinValue(val)}
                        setMaxValue={val => setMaxValue(val)}
                    />
                </div>
                <div className={style.buttons}>
                    <CustomButton
                        className="danger-btn"
                        onClickEvent={clearFiltersFunction}
                        textContent="Clean filters"
                    />
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={filterFunction}
                        textContent="Filter"
                    />
                </div>
            </div>
        </div>
    )
}