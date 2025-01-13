import { useNavigate } from "react-router";
import "./App.module.css";

function App() {
  const navigate = useNavigate();
  return (
    <main>
      <button onClick={() => navigate("/users")}>user</button>
      <button onClick={() => navigate("/cars")}>car</button>
    </main >
  )
}

export default App; 