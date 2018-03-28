import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

// tslint:disable-next-line:no-any
const handleLogin = (o: any) => {
    // tslint:disable-next-line:no-console
    console.log(o);
};

// tslint:disable-next-line:no-any
const LoginForm: React.SFC<{}> = props => {
    return (
        <form onSubmit={handleLogin}>
            <Field name="username" component="input" type="text" />
            <Field name="password" component="input" type="text" />
            <button type="submit">Submit</button>
        </form>
    );
};

export const Login = reduxForm({
    form: 'login'
})(LoginForm);

// tslint:disable-next-line:no-any
// const handleLogin = (o: object) => {
//     // tslint:disable-next-line:no-console
//     console.log(o);
// };

// export const Login: React.SFC<{}> = props => {
//     return (
//         <LoginForm handleSubmit={handleLogin} />
//     )
// }

// import * as React from 'react';
// import { API } from '../../api/api';

// export interface LoginProps { }

// export interface LoginState {
//     username: string;
//     password: string;
// }

// export class Login extends React.Component<LoginProps, LoginState> {
//     state: LoginState = {
//         username: '',
//         password: ''
//     };

//     constructor(props: LoginProps) {
//         super(props);
//     }

//     updateUserName = (event: React.FormEvent<HTMLInputElement>) => {
//         this.setState({username: event.currentTarget.value});
//     }

//     updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
//         this.setState({password: event.currentTarget.value});
//     }

//     login = () => {
//         API.Instance().ApiAuthPost({username: this.state.username, password: this.state.password});
//     }

//     render() {
//         return (
//             <div>
//                 <input type="text" onChange={this.updateUserName} />
//                 <input type="password" onChange={this.updatePassword} />
//                 <button onClick={this.login}>Login</button>
//             </div>
//         );
//     }
// }