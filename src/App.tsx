import { useEffect, useState } from 'react';
import './App.css'
import UserInput from './UserInput/UserInput';
import CustomButton from './CustomButton/CustomButton';
import UserDiv from './UserContainer/UserContainer';
import AllUsersList from './AllUsersList/AllUsersList';
import { editUser, deleteUser } from './API';
//tratativa de erro (por enquanto só no get)!!!!!
//pesquisar como acessar o status code -- DONE
//descobrir qd o back me retorna um erro
export type User = { id: string, name: string, age: number };
function App() {
  const [userName, setUserName] = useState<string>();
  const [userAge, setUserAge] = useState<string>();
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [isUserModalOpened, setIsUserModalOpen] = useState<boolean>(false);

  async function insertUser(user: User) {
    const data = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    const res = await data.json();
    setUsersList(prev => {
      return [...prev, res]
    });
  }

  async function callDeleteUser(ID: string) {
    const users = await deleteUser(ID);
    setUsersList(users);
  }

  async function callEditUser(user: User) {
    const users = await editUser(user);
    setUsersList(users);
  }

  useEffect(() => {
    setUsersList([]);
    fetch("http://localhost:8080/user").then(data => data.json()).then(res => setUsersList(res));
  }, []);

  return (
    <main>
      <div>
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
      </div>
      <div className="users-outside-container">
        <div className="users">
          {usersList.map(user => {
            return (
              <UserDiv
                user={user}
                userName={user.name}
                userAge={user.age}
                userID={user.id}
                deleteUser={(id) => callDeleteUser(id)}
                setUserName={(name) => setUserName(name)}
                setUserAge={(age) => setUserAge(age.toString())}
                onClickEvent={(user) => {
                  callEditUser(user);
                }}
                key={user.id}
              />
            )
          })}
        </div>
      </div>
      {isUserModalOpened &&
        <AllUsersList
          closeModal={() => setIsUserModalOpen(!isUserModalOpened)}
          userList={usersList}
          deleteUser={(id) => callDeleteUser(id)}
          editUser={(user) => callEditUser(user)}
        />
      }
    </main>
  )
}

export default App;