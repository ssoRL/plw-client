import { AuthState } from './state';
import { Reducer } from 'redux';
import { AuthActions } from './actions';

export const initialState = {
    token: null,
    fetching: false
};

export const AuthReducer: Reducer<AuthState> = (state: AuthState = initialState, action: AuthActions) => {
    switch (action.type) {
        case '@@auth/RequestToken':
            return {...state, fetching: true};
        case '@@auth/ReceiveToken':
            return {fetching: false, token: action.token};
        case '@@auth/InvalidateToken':
            return {fetching: false, token: 'tokval'};
        default:
            return state;
    }
}; 