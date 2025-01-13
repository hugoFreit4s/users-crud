import style from "./CustomButton.module.css";
type CustomButtonProps = {
    text: string;
    category: "primary" | "secondary" | "success" | "danger" | "warning" | "dark";
    action: () => void;
}
export default function CustomButton({ text, category, action }: CustomButtonProps) {
    return (
        <div className={`${style[`btn`]} ${style[`btn-${category}`]}`} onClick={action}>{text}</div>
    )
}