import { useEffect, useState } from 'react';
import './App.css'
import CustomButton from './CustomButton/CustomButton';
import UserDiv from './UserContainer/UserContainer';
import AllUsersList from './AllUsersList/AllUsersList';
import { insertUser, editUser, deleteUser } from './API';
import AddUserModal from './AddUserModal/AddUserModal';
import ToastMessage from './ToastMessage/ToastMessage';
//tratativa de erro (por enquanto só no get)!!!!!
//pesquisar como acessar o status code -- DONE
//descobrir qd o back me retorna um erro
export type User = { id: string, name: string, age: number };
function App() {
  const [userName, setUserName] = useState<string>();
  const [userAge, setUserAge] = useState<string>();
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [isInsertUserModalOpened, setIsInsertUserModalOpened] = useState<boolean>(false);
  const [isUserModalOpened, setIsUserModalOpen] = useState<boolean>(false);
  const [isToastShowed, setIsToastShowed] = useState<boolean>(false);

  async function callInsertUser(user: User) {
    const users = await insertUser(user);
    setUsersList(users);
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
      <div className="edit-and-add-btns">
        {isToastShowed && <ToastMessage
          category="success"
          message="Success!"
        />}
        <CustomButton
          className="primary-btn"
          onClickEvent={() => setIsInsertUserModalOpened(!isInsertUserModalOpened)}
          textContent='+ New User'
        />
        {isInsertUserModalOpened &&
          <AddUserModal
            closeModal={() => setIsInsertUserModalOpened(!isInsertUserModalOpened)}
            insertUser={(user) => {
              callInsertUser(user);
              setIsInsertUserModalOpened(!isInsertUserModalOpened);
              setIsToastShowed(!isToastShowed);
              setTimeout(() => {
                setIsToastShowed(false);
              }, 800);
            }}
          />}
        <CustomButton
          className="secondary-btn"
          onClickEvent={() => setIsUserModalOpen(!isUserModalOpened)}
          textContent='See all users'
        />
      </div>
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