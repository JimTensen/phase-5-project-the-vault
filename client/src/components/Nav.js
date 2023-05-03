import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'






const handleLogout = () => {
    fetch('/logout', {
        method:'DELETE'
    })
    .then(r => {
        if(r.ok){
            r.json().then(() => {
                updateUser(null)
                history.pushState('/authentication')
            })
        }

    })
}


        return (
            <Nav>
                <NavH1>Login</NavH1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li onCLick={handleLogout}>Logout</li>
                </ul>
            </Nav>
        )

export default Navigation

const NavH1 = styled.h1