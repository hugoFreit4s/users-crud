import CustomButton from "../CustomButton/CustomButton";
import style from "./CancelActionModal.module.css";

type ControlActionModal = {
    text: string;
    confirmAction: () => void;
    cancelAction: () => void;
}
export default function ControlActionModal({ text, confirmAction, cancelAction }: ControlActionModal) {
    const splittedText = text.split("splt");
    const firstPart = splittedText[0];
    const secondPart = splittedText[1];
    return (
        <div className={style.backdrop}>
            <div className={style.content}>
                <p>{firstPart}<br />{secondPart}</p>
                <div className={style.buttons}>
                    <CustomButton
                        action={cancelAction}
                        category="secondary"
                        text="Cancel"
                    />
                    <CustomButton
                        action={confirmAction}
                        category="danger"
                        text="Confirm"
                    />
                </div>
            </div>
        </div>
    )
}