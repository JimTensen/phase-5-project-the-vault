import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import PrivateRoute from './components/common/PrivateRoute';
import Header from './components/layout/Header';
import CollectionList from './components/collection/CollectionList';
import Collection from './components/collection/Collection';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="container mx-auto flex-grow">
            <Switch>
              <PrivateRoute exact path="/collections" component={CollectionList} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;