import STORE_CONSTANTS from '../constants'
const idGenerator = require('uuid/v4');

export const addEvent = (date: string, event: string) => ({
    type: STORE_CONSTANTS.ACTIONS.ADD_EVENT,
    id: idGenerator(),
    date: date,
    eventName: event
})

export const deleteEvent = (index: number) => ({
    type: STORE_CONSTANTS.ACTIONS.DELETE_EVENT,
    index: index
})

export const setVisibilityFilter = (filter: string) => ({
    type: STORE_CONSTANTS.ACTIONS.SET_VISIBILITY_FILTER,
    filter: filter
})