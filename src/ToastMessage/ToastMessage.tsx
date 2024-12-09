import { useEffect, useState } from "react";
import styles from "./ToastMessage.module.css";

type ToastMessageProps = {
    category: "success" | "fail" | "alert" | string;
    message: string
}
export default function ToastMessage({ category, message }: ToastMessageProps) {
    return (
        <div className={styles["backdrop"]}>
            <div className={`${styles["main-content"]} ${styles[category]}`}>
                <p>{message}</p>
            </div>
        </div>
    )
}