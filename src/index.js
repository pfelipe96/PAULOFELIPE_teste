import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import RecorderDriver from './component/recorderDriver/RecorderDriver';
import RecorderCustomer from './component/recorderCustomer/RecorderCustomer';
import RecorderRunning from './component/recorderAndQuery/RecorderRunning';


ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/motorista"  component={RecorderDriver} />
            <Route path="/passageiro" component={RecorderCustomer} />
            <Route path="/" exact={true} component={RecorderRunning} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
