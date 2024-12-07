import { useEffect, useState } from 'react';
import CustomButton from './CustomButton/CustomButton';
import UserDiv from './UserContainer/UserContainer';
import AllUsersList from './AllUsersList/AllUsersList';
import { insertUser, editUser, deleteUser, getUsers } from './API';
import AddUserModal from './AddUserModal/AddUserModal';
import ToastMessage from './ToastMessage/ToastMessage';
import style from "./App.module.css";
//tratativa de erro (por enquanto só no get)!!!!!
//pesquisar como acessar o status code -- DONE
//descobrir qd o back me retorna um erro
export type User = { id: number | null, name: string, age: number, phone: string };
function App() {
  const [usersList, setUsersList] = useState<Array<User>>([]);
  const [isInsertUserModalOpened, setIsInsertUserModalOpened] = useState<boolean>(false);
  const [isUserModalOpened, setIsUserModalOpen] = useState<boolean>(false);
  const [isToastShowed, setIsToastShowed] = useState<boolean>(false);

  async function callGetUsers() {
    return await getUsers();
  }

  async function callInsertUser(user: User) {
    const users = await insertUser(user);
    setUsersList(users);
  }

  async function callEditUser(user: User) {
    const users = await editUser(user);
    setUsersList(users);
  }

  async function callDeleteUser(id: number) {
    const users = await deleteUser(id);
    setUsersList(users);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersArray = await callGetUsers();
        setUsersList(usersArray);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <main>
      <div className={style["edit-and-add-btns"]}>
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
      <div className={style["users"]}>
        {usersList.length > 0 && usersList.map(user => {
          return (
            <UserDiv
              user={user}
              userName={user.name}
              userAge={user.age}
              userID={user.id!}
              deleteUser={(id) => callDeleteUser(id!)}
              onClickEvent={(user) => {
                callEditUser(user);
              }}
              key={user.id}
            />
          )
        })}
        {usersList.length <= 0 && <p>Empty</p>}
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