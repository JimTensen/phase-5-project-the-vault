import React, { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import NavBar from "./NavBar";
import Home from "./Home";
import Collections from "./Collections";
import CollectionDetails from "./CollectionDetails";

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleSignupClick = () => {
    history.push("/signup");
  };

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>
          <Route path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route path="/collections">
            <Collections user={user} />
          </Route>
          <Route path="/collection/:id">
            <CollectionDetails user={user} />
          </Route>
          <Route path="/">
            <Home
              user={user}
              handleLoginClick={handleLoginClick}
              handleSignupClick={handleSignupClick}
            />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;