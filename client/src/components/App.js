import React from 'react';
import {Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import PrivateRoute from './common/PrivateRoute';
import Header from './layout/Header';
import CollectionList from './collection/CollectionList';
import Login from './auth/Login';
import Signup from './auth/Signup';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <h1>it works</h1>
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