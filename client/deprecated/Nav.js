import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components';

function Nav({updateUser}) {
    const history = useHistory()

    const handleLogout = () => {
        fetch('/logout', {
            method:'DELETE'
        })
        .then(res => {
            if(res.ok){
                updateUser(null)
                history.push('/authentication')
            }
        })
    }
    return (
            <div>
                <h1>Login</h1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/authentication'> Login/Signup </Link></li>
                    <li onCLick={handleLogout}>Logout</li>
                </ul>
            </div>
    )
}


export default Nav