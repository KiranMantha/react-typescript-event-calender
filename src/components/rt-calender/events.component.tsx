import * as React from 'react';

interface iEvent {
    id: string;
    date: string;
    eventName: string;
}

export default class Events extends React.Component<{ events: iEvent[], selectedDate:string }, {}> {
    getDayName = (dayIndex:number) => {
        switch(dayIndex) {
            case 0: return 'Sun'
            case 1: return 'Mon'
            case 2: return 'Tue'
            case 3: return 'Wed'
            case 4: return 'Thr'
            case 5: return 'Fri'
            case 6: return 'Sat'
        }
    }
    render() {
        let events,        
        selectedDate = this.props.selectedDate;
        if(this.props.events) {
            events = this.props.events.map((event:iEvent, i:number) => {
                if(selectedDate !== '' && event.date === selectedDate) {
                    let date = new Date(event.date);
                    return(
                        <div key={i} className="flex align-center event">
                            <div className="flex flex-column event-date">
                                <p>{this.getDayName(date.getDay())}</p>
                                <p>{date.getDate()}</p>
                            </div>
                            <div>{event.eventName}</div>
                        </div>
                    ) 
                }
            });
        }
        return(
            <div className="">
                {events}
            </div>
        )
    }
}