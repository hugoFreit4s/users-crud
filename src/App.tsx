import { Navigate, useNavigate } from "react-router";
import CustomButton from "./CustomButton/CustomButton";

function App() {
  const navigate = useNavigate();
  return (
    <main>
      <CustomButton
        className="primary-btn"
        onClickEvent={() => {
          navigate("/users");
        }}
        textContent="Users"
      />
      <CustomButton
        className="primary-btn"
        onClickEvent={() => {
          navigate("/cars");
        }}
        textContent="Cars"
      />
    </main>
  )
}

export default App; 