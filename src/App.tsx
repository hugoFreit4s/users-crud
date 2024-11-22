import { useEffect, useState } from 'react';
import './App.css'
import UserInput from './UserInput';
import CustomButton from './CustomButton';
import UserDiv from './UserDiv';
import AllUsersList from './AllUsersList';

export type User = { id: string, name: string, age: number };
function App() {
  const [userName, setUserName] = useState<string>();
  const [userAge, setUserAge] = useState<string>();
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [isUserModalOpened, setIsUserModalOpen] = useState<boolean>(false);

  function insertUser(user: User) {
    fetch("http://localhost:8080/user", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) }).then(data => data.json()).then(res => setUsersList(res));
  }

  function deleteUser(ID: string) {
    fetch("http://localhost:8080/user", { method: "DELETE", body: ID }).then(data => data.json()).then(res => setUsersList(res));
  }

  function editUser(user: User) {
    fetch("http://localhost:8080/user", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(user) }).then(data => data.json()).then(res => setUsersList(res));
  }

  useEffect(() => {
  }, [usersList])

  useEffect(() => {
  }, [userName])

  useEffect(() => {
    setUsersList([]);
    if (usersList.length > 0) {
      fetch("http://localhost:8080/user").then(data => data.json()).then(res => setUsersList(prev => [...prev, res]));
    } else {
      fetch("http://localhost:8080/user").then(data => data.json()).then(res => setUsersList(res));
    }
  }, []);

  return (
    <main>
      <UserInput
        userName={userName!}
        userAge={userAge!}
        setUserName={(name) => setUserName(name)}
        setUserAge={(age) => setUserAge(age.toString())}
      />
      <CustomButton
        className="primary-btn"
        onClickEvent={() => {
          if (userName !== undefined && userName !== null && userName?.length > 0 && userAge !== undefined) {
            insertUser({ id: crypto.randomUUID(), name: userName, age: Number(userAge) })
            setUserName('');
            setUserAge('')
          }
        }}
        textContent='Add User'
      />
      <CustomButton
        className="secondary-btn"
        onClickEvent={() => setIsUserModalOpen(!isUserModalOpened)}
        textContent='See all users'
      />
      <div>
        {usersList.map(user => {
          return (
            <UserDiv
              currentUserName={user.name}
              currentUserAge={user.age}
              userName={userName != undefined ? userName : ''}
              userAge={userAge != undefined ? userAge : ''}
              userID={user.id}
              deleteUser={(id) => deleteUser(id)}
              setUserName={(name) => setUserName(name)}
              setUserAge={(age) => setUserAge(age.toString())}
              onClickEvent={() => {
                if (userName !== undefined && userName !== null && userName?.length > 0 && userAge !== undefined) {
                  editUser({ id: user.id, name: userName, age: Number(userAge) });
                }
                setUserName('');
                setUserAge('');
              }}
              key={user.id}
            />
          )
        })}
      </div>
      {isUserModalOpened &&
        usersList.map(user => {
          return (
            <AllUsersList
              closeModal={() => setIsUserModalOpen(!isUserModalOpened)}
              user={user}
              key={user.id}
            />
          )
        })
      }
    </main>
  )
}

export default App;