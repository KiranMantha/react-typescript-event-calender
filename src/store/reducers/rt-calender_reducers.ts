import STORE_CONSTANTS from '../constants';
import * as _ from 'lodash';
import { combineReducers } from 'redux'

interface iEvent {
    id: string;
    date: string;
    eventName: string;
}

interface iAction extends iEvent {
    type: string;
    index: number;
}

let events = (state:iEvent[] = [], action:iAction) => {
    switch (action.type) {
        case STORE_CONSTANTS.ACTIONS.ADD_EVENT: {
            return [
                ...state,
                {
                    id: action.id,
                    date: action.date,
                    eventName: action.eventName
                }   
            ]
        }
        case STORE_CONSTANTS.ACTIONS.DELETE_EVENT: {
            //do not mutate state hence create new array
            let newArray = state.slice();
            newArray.splice(action.index, 1);
            return newArray;
        }
        default: {
          return state
        }
    }
}

export const calenderApp = combineReducers({ events });
