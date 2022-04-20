import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import useUser from '../customHooks/useUser';

import Home from '../views/Home';
import Pricing from '../views/Pricing';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Products from '../views/Products';
import Moves from '../views/Moves';
import Profile from '../views/Profile';
import Error from '../views/E404';

export default function App() {

  const { user } = useUser();
  const [mode, setMode] = useState(false);

    return (
      <div className={mode ? 'dark' : 'light'}>
        <Router>
          {
            user
            ? (
              <Switch>
                <Route path="/dashboard" exact><Dashboard mode={mode} setMode={setMode}/></Route>
                <Route path="/products" exact><Products mode={mode} setMode={setMode}/></Route>
                <Route path="/moves" exact><Moves mode={mode} setMode={setMode}/></Route>
                <Route path="/profile" exact><Profile mode={mode} setMode={setMode}/></Route>
                <Route><Error /></Route>
              </Switch>
            )
            : (
              <Switch>
                <Route path="/login" exact><Login mode={mode} setMode={setMode}/></Route>
                <Route path="/pricing" exact><Pricing mode={mode} setMode={setMode}/></Route>
                <Route path="/" exact><Home mode={mode} setMode={setMode}/></Route>
                <Route><Error/></Route>
              </Switch>
            )
          }
        </Router>
      </div>
    );
  }