import { useEffect, useState } from 'react';
import './App.css'

type User = { name: string, age: number };
function App() {
  const [user, setUser] = useState<User>();
  const [userName, setUserName] = useState<string>();
  const [userAge, setUserAge] = useState<number>();
  const [usersList, setUsersList] = useState<Array<User>>([]);

  function insertUser(user: User) {
    if (usersList.length > 0) {
      fetch("http://localhost:8080/user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) }).then(data => data.json()).then(res => setUsersList(prev => [...prev, res]));
    } else {
      fetch("http://localhost:8080/user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) }).then(data => data.json()).then(res => setUsersList(res));
    }
  }

  useEffect(() => {
    setUsersList([]);
    if (usersList.length > 0) {
      fetch("http://localhost:8080/user").then(data => data.json()).then(res => setUsersList(prev => [...prev, res]));
    } else {
      fetch("http://localhost:8080/user").then(data => data.json()).then(res => setUsersList(res));
    }
    console.log(usersList)
    usersList.map(x => console.log(x))
  }, []);

  return (
    <>
      <input type="text" onChange={e => setUserName(e.target.value)} />
      <input type="number" name="user_age_input" id="user_age_input" onChange={e => setUserAge(Number(e.target.value))} />
      <button onClick={() => insertUser({ name: userName || '', age: userAge || 0 })}>Cadastrar</button>
      <div style={{ display: 'flex', gap: '20px', color: 'red' }}>
        {usersList.map(user => {
          return <p>{user.name}</p>
        })}
      </div>
    </>
  )
}

export default App;