import './App.css';
import React, {useEffect} from 'react'
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profile from './Profile';
import Catalog from './Catalog';
import For_whom from './For whom';
import {checkAuth, loginUser, setAuth} from "./actions/actions";
import {useDispatch} from "react-redux";

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAuth().then(data => {
                console.log(data)
                if (data) {
                    dispatch(setAuth(true))
                    dispatch(loginUser(data.data.user))
                }
            })
        }
    }, [])

  return(
    <>
      <Router>

    <Header/>
            <Routes>
            <Route exact path='/' element={<Home/>}> </Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/Profile' element={<Profile/>}></Route>
            <Route path='/Catalog' element={<Catalog/>}></Route>
            <Route path='/For_whom' element={<For_whom/>}></Route>
        </Routes>
    </Router>

</>
  )
}

export default App;