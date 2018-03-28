import { Reducer, combineReducers } from 'redux';
import { AuthState } from './auth/state';
import { AuthReducer } from './auth/reducers';
import { reducer as formReducer } from 'redux-form';

export interface PlwState {
    auth: AuthState;
}

export const PlwReducer: Reducer<PlwState> = combineReducers<PlwState>({
    auth: AuthReducer,
    form: formReducer
});