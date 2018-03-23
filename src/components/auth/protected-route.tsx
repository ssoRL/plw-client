import * as React from 'react';
import { Route, Redirect } from 'react-router';

// tslint:disable-next-line:no-any
export class ProtectedRoute extends React.Component<{ path: string, authenticated: boolean }, {}> {
    render() {
        return (
            <Route
                path={this.props.path}
                render={props =>
                    this.props.authenticated ? (
                        this.props.children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: '/login',
                                    state: { from: props.location }
                                }}
                            />
                        )
                }
            />
        );
    }
}
