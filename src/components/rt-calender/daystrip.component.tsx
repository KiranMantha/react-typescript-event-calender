import * as React from 'react';

export default class DayStrip extends React.Component<{ dayNames:string[] }, {}> {
    render(){
        let days = this.props.dayNames.map((day:string, i:number) => {
            return <div key={i} className="r-cell">{day}</div>
        });
        return(
            <div className="flex day-strip">
                {days}
            </div>
        )
    }
}