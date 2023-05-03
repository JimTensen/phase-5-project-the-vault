import { useEffect } from 'react'
import Authentication from './components/Authentication'

function App() {
    const [user, setUser] = useState(null)
    const history = useHistory()

   
    


    const fetchUser = () = {

    }


    const updateUser = (user) => setUser(user)

    return (
        <>
        <GlobalStyle/>
        <Navigation updateUser={updateUser}/>
            <Switch>
                <Route exact path='/'>
                    <Home/>
                </Route>
                <Route exact path='/collections'>
                    <Collections/>
                </Route>
                <Route path='/collections'>
                    <Collections/>
                </Route>                
                <Route exact path='/authentication'>
                    <Authentication updateUser={updateUser}/>
                </Route>
            </Switch>
        </>
    )
}

export default App