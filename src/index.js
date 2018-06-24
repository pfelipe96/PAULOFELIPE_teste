import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import RecorderDriver from './component/recorderCustomer/RecorderCustomer';
import RecorderCustomer from './component/recorderDriver/RecorderDriver';
import RecorderRunning from './component/recorderAndQuery/RecorderRunning';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/motorista" exact={true} component={RecorderDriver} />
            <Route path="/passageiro" component={RecorderCustomer} />
            <Route path="/" component={RecorderRunning} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
