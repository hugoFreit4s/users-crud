import style from "./UsersPage.module.css";
import { useEffect, useState } from 'react';
import CustomButton from '../../CustomButton/CustomButton';
import UserContainer from '../UserContainer/UserContainer';
import AllUsersList from '../AllUsersList/AllUsersList';
import { insertUser, editUser, deleteUser, getUsers } from '../../API';
import InsertUserModal from '../InsertUserModal/InsertUserModal';
import ToastMessage from '../../ToastMessage/ToastMessage';
import { useNavigate } from "react-router";
import NavigateBackButton from "../../NavigateBackButton/NavigateBackButton";

export type postUserDTO = { id: number | null, name: string, gender: string, birthDate: Date | null, phone: string };
export type getUserDTO = { id: number, name: string, gender: string, phone: string, age: number, birthDate: Date | null };
type ToastState = { message: string, isShown: boolean, category: "fail" | "success" | "alert" | string }

export default function UsersPage() {
    const navigate = useNavigate();
    const [usersList, setUsersList] = useState<Array<getUserDTO>>([]);
    const [isInsertUserModalOpened, setIsInsertUserModalOpened] = useState<boolean>(false);
    const [isUserModalOpened, setIsUserModalOpen] = useState<boolean>(false);
    const [toastState, setToastState] = useState<ToastState>({ message: "", category: "", isShown: false });
    //TODO: Pesquisar sobre TODO na hora do commit

    async function callGetUsers() {
        return await getUsers();
    }

    async function callInsertUser(user: postUserDTO) {
        const responseDTO = await insertUser(user);
        setUsersList(responseDTO.users !== null ? responseDTO.users : usersList);
        setToastState({ message: responseDTO.toastMessage, category: responseDTO.toastCategory, isShown: true })
        setTimeout(() => {
            setToastState({ ...toastState, isShown: false });
        }, 800);
    }

    async function callEditUser(user: postUserDTO) {
        const users = await editUser(user);
        setUsersList(users);
    }

    async function callDeleteUser(id: number) {
        const users = await deleteUser(id);
        setUsersList(users);
    }

    // async function callFilterUser(gender: string, age: number){
    //     const users = await
    // }

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
            <div className={style["top"]}>
                <NavigateBackButton path="/" />
                <div className={style["edit-and-add-btns"]}>
                    {toastState?.isShown && <ToastMessage
                        category={toastState.category}
                        message={toastState.message}
                    />}
                    <CustomButton
                        className="primary-btn"
                        onClickEvent={() => setIsInsertUserModalOpened(!isInsertUserModalOpened)}
                        textContent='+ New User'
                    />
                    {isInsertUserModalOpened &&
                        <InsertUserModal
                            closeModal={() => setIsInsertUserModalOpened(!isInsertUserModalOpened)}
                            insertUser={(user) => {
                                callInsertUser(user);
                                setIsInsertUserModalOpened(!isInsertUserModalOpened);
                            }}
                        />}
                    <CustomButton
                        className="secondary-btn"
                        onClickEvent={() => setIsUserModalOpen(!isUserModalOpened)}
                        textContent='See all users'
                    />
                </div>
            </div>
            <div className={style["users"]}>
                {usersList.length > 0 && usersList.map(user => {
                    return (
                        <UserContainer
                            user={user}
                            postUser={{ birthDate: null!, gender: user.gender, id: user.id, name: user.name, phone: user.phone }}
                            deleteUser={(id) => callDeleteUser(id!)}
                            onClickEvent={(user) => callEditUser(user)}
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