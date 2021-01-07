/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { userReducer } from './redux/reducers/user.reducer';
import { adminReducer } from './redux/reducers/admin.reducer';
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import './assets/css/site.css';
import Login from './views/Login';
import AdminLayout from "layouts/Admin";
import DoctorLayout from './layouts/Doctor';
import PatientLayout from './layouts/Patient';
import PharmacistLayout from './layouts/Pharmacist';
import { loginToPatient , getPatientById } from './routes';
import { doctorReducer } from "redux/reducers/doctor.reducer";

const hist = createBrowserHistory();

const store = createStore(combineReducers({adminReducer : adminReducer , userReducer : userReducer , doctorReducer : doctorReducer}), applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Login} exact/>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path={'/doctor'} render={props => <DoctorLayout {...props} />} />
        <Route path={loginToPatient.path} render={props => <loginToPatient.component {...props} />} exact />
        <Route path={'/patient'} render={props => <PatientLayout {...props} />} />
        <Route path={getPatientById.path} render={props => <getPatientById.component {...props} />} exact />
        <Route path={'/pharmacist'} render={props=> <PharmacistLayout {...props}/>}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
