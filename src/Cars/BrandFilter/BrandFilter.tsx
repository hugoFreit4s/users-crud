type BrandFilterProps = {
    brands: string[];
    brand: string;
    setBrand: (brand: string) => void;
}

export default function BrandFilter({ brands, brand, setBrand }: BrandFilterProps) {
    return (
        <div>
            <select value={brand} onChange={e => setBrand(e.target.value)}>
                <option value="default">Select a brand</option>
                {brands.map(brand => { return <option key={brand} value={brand}>{brand}</option> })}
            </select>
        </div>
    )
}