type CustomButtonProps = {
    className: "primary-btn" | "secondary-btn" | "danger-btn";
    onClickEvent: () => void;
    textContent: string;
}
export default function CustomButton({ className, onClickEvent, textContent }: CustomButtonProps) {
    return <button className={className} onClick={onClickEvent}>{textContent}</button>
}