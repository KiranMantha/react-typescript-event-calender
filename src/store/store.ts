import { createStore } from 'redux';
import { calenderApp } from './reducers/rt-calender_reducers';
import STORE_CONSTANTS from './constants';

const configureStore = () => {
    const store = createStore(calenderApp, STORE_CONSTANTS.initialState);
    store.subscribe(() =>
        console.log(store.getState())
    );
    return store;
}

export default configureStore;