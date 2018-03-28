import { Dispatch, Action } from 'redux';
import { API } from '../../api/api';

interface RequestToken extends Action {
    type: '@@auth/RequestToken';
}

interface ReceiveToken extends Action {
    type: '@@auth/ReceiveToken';
    token: string;
}

interface InvalidateToken extends Action {
    type: '@@auth/InvalidateToken';
}

export type AuthActions = RequestToken | ReceiveToken | InvalidateToken;

export const fetchToken = (username: string, password: string) => (dispatch: Dispatch<AuthActions>) => {
    dispatch({ type: '@@auth/RequestToken' });
    const api = API.Instance();
    api.ApiAuthPost({username: username, password: password}).then(
        token => {
            // Set the token on the api here for future use
            api.token = token;
            dispatch({
                type: '@@auth/ReceiveToken',
                token: token
            });
        }
    );
};

export const invalidateToken = () => (dispatch: Dispatch<InvalidateToken>) => {
    dispatch({ type: '@@auth/InvalidateToken' });
};