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

    return (
            <Navi>
                <NavH1>Login</NavH1>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li onCLick={handleLogout}>Logout</li>
                </ul>
            </Navi>
    )
    }
}

export default Nav

const NavH1 = styled.h1`
font-family: 'Splash', cursive;
`
const Navi = styled.div`
    display: flex;
    justify-content:space-between;
    align-items: center;
    font-damily:Arial;
    a{
        text-decoration: none;
        color:white;
    }
    a:hover{
        color:red
    }
    ul{
        list-style:none;
    }
`;
