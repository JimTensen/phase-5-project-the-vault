import React, {useState, useEffect} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'
import GlobalStyle from '../globalStyles'
import Nav from './Nav'
import Home from './Home'
import Authentication from './Authentication'

function App() {
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = () => {
        fetch('/authorized')
        .then(res => {
            if(res.ok){
                res.json().then(user => setUser(user))
            }else {
                setUser(null)
            }
        })
    }

    const updateUser = (user) => setUser(user)
    if(!user)return(
        <>
        <div className ='navbar'></div>
            <h1 className ='navbarh'>The Vault</h1>
        <GlobalStyle />
        {/* <Nav /> */}
        <Authentication updateUser={updateUser} />
        </>
    )
    return (
        <>
        <div className ='navbar'>
            <h1 className ='navbarh'>The Vault</h1>
        <GlobalStyle/>
        {/* <Nav updateUser={updateUser}/> */}
            {/* <Switch> */}
                <Route exact path='/'>
                    <Home/>
                </Route>
                 {/* <Route exact path='/collections'>
                     <Collections/>
                 </Route>
                 <Route path='/collections'>
                     <Collections/>
                 </Route>                
                 <Route exact path='/authentication'>
                     <Authentication updateUser={updateUser}/>
                 </Route>
             </Switch> */}
        </div>
        </>
    )
}

export default App