import * as React from 'react';
import { API } from '../api/api';

export interface LoginProps { }

export interface LoginState {
    username: string;
    password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {
    state: LoginState = {
        username: '',
        password: ''
    };
    
    api: API = new API('http://localhost:5000');

    constructor(props: LoginProps) {
        super(props);
    }

    updateUserName = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({username: event.currentTarget.value});
    }

    updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({password: event.currentTarget.value});
    }

    login = () => {
        // tslint:disable-next-line:no-console
        console.log(`${this.state.username} w/ ${this.state.password}`);
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.updateUserName} />
                <input type="password" onChange={this.updatePassword} />
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}