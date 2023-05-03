import React, {useState, useEffect} from 'react'
import {Switch, Route, useHistory} from 'react-router-dom'
import Home from './Home'
import Authentication from './Authentication'

function App() {
    const [user, setUser] = useState(null)
    const history = useHistory()

   
    


    // const fetchUser = () = {

    // }


    const updateUser = (user) => setUser(user)

    return (
        <div className ='navbar'>
            <h1 className ='navbarh'>The Vault</h1>
    {/* //     <GlobalStyle/>
    //     <Navigation updateUser={updateUser}/>
    //         <Switch>*/}
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
    )
}

export default App