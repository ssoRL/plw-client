import * as React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { Home } from '../home.component';
import { Login } from './login';
import { ProtectedRoute } from './protected-route';

export interface PlwRoutesProps {

}

export interface PlwRoutesState {
    authenticated: boolean;
    token: string;
}

export class PlwRoutes extends React.Component<PlwRoutesProps, PlwRoutesState> {
    state: PlwRoutesState = {
        authenticated: false,
        token: ''
    };
    
    constructor(props: PlwRoutesProps) {
        super(props);
    }

    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <ProtectedRoute path="/">
                        <Home />
                    </ProtectedRoute>
                </Switch>
            </Router>
        );
    }
}