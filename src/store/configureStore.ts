import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './index';
import { composeWithDevTools } from 'redux-devtools-extension';
import api from '../api';

export default function configureStore(initialState = {}) {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));
}