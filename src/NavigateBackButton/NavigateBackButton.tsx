import { useNavigate } from "react-router";
import style from "./NavigateBackButton.module.css";

type NavigateBackButtonProps = {
    path: string;
}

export default function NavigateBackButton({ path }: NavigateBackButtonProps) {
    const navigate = useNavigate();
    return (
        <div className={style["navegate_back_btn"]} onClick={() => { navigate(path) }}>&#8617;</div>
    )
}