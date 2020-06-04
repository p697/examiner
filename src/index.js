import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './index.css';

import Menu from './coms/menu/menu'
import CheckSinglePage from './pages/check_single/index'
import CheckExcelPage from './pages/check_excel/index'
import CheckDonePage from './pages/check_done/index'
import KeyCreatePage from './pages/key_create/index'
import HelpPage from './pages/help/index'


const App = () => {
  return (
    <Router>
      <div className="app">
        <Menu />
        <div className="page">
          <Switch>
            <Route path="/check_excel">
              <CheckExcelPage />
            </Route>
            <Route exact path="/check_single">
              <CheckSinglePage />
            </Route>
            <Route path="/check_done">
              <CheckDonePage />
            </Route>
            <Route path="/key_create">
              <KeyCreatePage />
            </Route>
            <Route path="/help">
              <HelpPage />
            </Route>
            <Route path="/">
              <CheckExcelPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}


ReactDOM.render((
  <App />
), document.getElementById("root"))

