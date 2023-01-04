import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from './Components/Header'
import AddTask from './Components/AddTask'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Button, makeStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login, logout } from './features/userSlice'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import PageScrollingInfinite from './Components/PageScrollingInfinite'

const useStyles = makeStyles({
  loginText: {
    textAlign: 'center',
    fontSize: '40px',
    color: 'white',
    position: 'relative',
    top: '210px'
  }
})

function App() {

  const classes = useStyles()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loggedIn, username } = useSelector(selectUser)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const openSignoutModal = () => {
    setOpen(true)
  }

  const closeSignoutModal = () => {
    setOpen(false)
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const logOut = () => {
    setEmail('')
    setPassword('')
    dispatch(logout({
      loggedIn: false
    }))
    console.log(logout)
  }

  const handleSubmit = () => {
    if (email === '' || password === '') {
      alert('Invalid Email or Password')
      closeSignoutModal()
    }

    else {
      axios.post('https://reqres.in/api/login', {
        email: email,
        password: password
      })
        .then(result => {
          alert('Logged in Successful')
          closeSignoutModal()
          localStorage.setItem("token", result.data.token)
          dispatch(login({
            email: email,
            password: password,
            loggedIn: true,
          }))
        })
        .catch(error => {
          alert('Invalid Email or Password')
          dispatch(logout({
            email: email,
            password: password,
            loggedIn: false
          }))
        })
    }
  }
  return loggedIn ? (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path='/userprofiles' element={<PageScrollingInfinite />} />
        </Routes>

        <Link to="/userprofiles"><Button variant='contained' id="btn-user">User Profile</Button></Link>
        <p className='email'>Welcome | {username} |</p>
        <Link to="/"><PowerSettingsNewIcon id='logout'onClick={openSignoutModal}/></Link>
     
      </BrowserRouter>

      <Dialog open={open} onClose={closeSignoutModal} >
        <DialogTitle>
          {"Confirm Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to signout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSignoutModal}>Cancel</Button>
          <Button id="btn-agree" onClick={logOut}>
            Sign-out
          </Button>
        </DialogActions>
      </Dialog>
      <AddTask />
    </>
  ) : (
    <>
      <p className={classes.loginText}>Sign-in</p>
      <div className='inputBox'>
        <input type="text" placeholder="Email"
          value={email}
          onChange={handleEmail} className="emailInputBox" />
        <input type="password" placeholder="Password"
          value={password}
          onChange={handlePassword} className="passwordInputBox" />
        <Button variant='contained' onClick={handleSubmit} id='btn-login'>Login</Button>
      </div>
    </>
  )
}

export default App

