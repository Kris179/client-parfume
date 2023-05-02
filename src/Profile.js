import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import FormAuth from "./components/FormAuth";
import FormRegister from "./components/FormRegister";
import AuthService from "./services/AuthService";
import AdminService from "./services/AdminService";
import UsersTable from "./components/UsersTable";
import {useSelector} from "react-redux";

function Profile() {
    const {curUser} = useSelector((state) => state)
    const [users, setUsers] = useState([])
    const {fetchUsers} = AdminService()
    useEffect(() => {
        fetchUsers().then((data) => {
            setUsers(data.data)
        })
    }, [])

    return (
        <>
            {curUser.Admin ? <UsersTable users={users}/> : null}
        </>
    )
}

export default Profile;