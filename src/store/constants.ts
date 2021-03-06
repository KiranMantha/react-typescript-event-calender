const STORE_CONSTANTS = {
    ACTIONS: {
        GET_EVENTS: 'GET_EVENTS',
        ADD_EVENT: 'ADD_EVENT',
        DELETE_EVENT: 'DELETE_EVENT'
    },

    initialState: {
        //events: Array()
        events: [
            {
                id: '',
                date: '1/1/2018',
                eventName: 'Test event from store'
            },{
                id: '',
                date: '1/1/2018',
                eventName: 'Test event from store2'
            },{
                id: '',
                date: '1/2/2018',
                eventName: 'Test event from store 1234'
            },{
                id: '',
                date: '2/1/2018',
                eventName: 'Test event from store3'
            },{
                id: '',
                date: '2/10/2018',
                eventName: 'Test event from store4'
            }
        ]
    } 
}

export default STORE_CONSTANTS;