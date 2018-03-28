import * as React from 'react';
import { Route, Redirect } from 'react-router';
import { PlwState } from '../../store/index';
import { connect } from 'react-redux';

// tslint:disable-next-line:no-any
const ProtectedRouteCmp: React.SFC<{ path: string, authenticated: boolean }> = props => (
    <Route
        path={props.path}
        render={routeProps =>
            props.authenticated ? (
                props.children
            ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: routeProps.location }
                        }}
                    />
                )
        }
    />
);

const mapStateToProps = (state: PlwState) => ({
    authenticated: state.auth.token == null ? true : false
});

export const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteCmp);