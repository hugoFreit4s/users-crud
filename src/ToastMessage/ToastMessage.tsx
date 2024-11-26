import styles from "./ToastMessage.module.css";

type ToastMessageProps = {
    category: "success" | "fail" | "alert";
    message: string
}
export default function ToastMessage({ category, message }: ToastMessageProps) {
    return (
        <div className={styles["backdrop"]}>
            <div className={styles["main-content"]}>
                <p>{message}</p>
            </div>
        </div>
    )
}