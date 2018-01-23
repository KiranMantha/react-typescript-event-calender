import * as React from 'react';

interface MonthDatesProps {
    month: number;
    year: number;
    daysInMonth: number;
    firstOfMonth: Date;
    startDay: number;
    onSelectDate: (year: number, month:number, date:number) => void;
    weekNumbers:any;
    disablePast:boolean;
    minDate:Date;
    //eventsForCurrentMonth:number[];
}

interface MonthDatesState {
    year:number;
    month:number;
    date:number;
}

export default class MonthDates extends React.Component<MonthDatesProps, MonthDatesState> {
    
    constructor(props:any){
        super(props);
    }

    componentWillReceiveProps(){
        let date = new Date();
        let statics = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate()
        }
        this.setState(statics);
    }

    render() { 
        let haystack, 
            day:number, 
            d:number, 
            current, 
            onClick,
            that = this,
            isDate, className,
            weekStack = Array.apply(null, {length: 7}).map(Number.call, Number),
            startDay = this.props.firstOfMonth.getUTCDay(),
            first = this.props.firstOfMonth.getDay(),
            janOne:Date = new Date(this.props.year, 0, 1),
            rows = 5,            
            today:Date = new Date();

        if ((startDay == 5 && this.props.daysInMonth == 31) || (startDay == 6 && this.props.daysInMonth > 29)) {
            rows = 6;
        }

        className = rows === 6 ? 'r-dates' : 'r-dates r-fix';
        haystack = Array.apply(null, {length: rows}).map(Number.call, Number);
        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;
        return (
            <div className={className}>
            {haystack.map(function (item:number, i:number) {
                d = day + i * 7;
                return (
                    <div key={i} className="r-row">

                    {
                        weekStack.map(function (item:number, i:number) {
                            d += 1;
                            isDate = d > 0 && d <= that.props.daysInMonth;

                            if (isDate) {
                                current = new Date(that.props.year, that.props.month, d);
                                if( current.getFullYear() == today.getFullYear() && current.getMonth() === today.getMonth() && current.getDate() == today.getDate() ){
                                    className = 'r-cell r-date r-today';
                                } else {
                                    className = 'r-cell r-date';
                                }                                
                                if (that.props.disablePast && current < today) {
                                    className += ' r-past';
                                } else if (that.props.minDate !== null && current < that.props.minDate) {
                                    className += ' r-past';
                                }

                                let k = d;

                                if (/r-past/.test(className)) {
                                    return (
                                        <div key={i} className={className} role="button" onClick={ () => { that.props.onSelectDate(that.props.year, that.props.month, k) }}>{d}</div>
                                    );
                                }

                                return (
                                    <div key={i} className={className} role="button" onClick={ () => { that.props.onSelectDate(that.props.year, that.props.month, k) }}>{d}</div>
                                );
                            }

                            return (
                                <div key={i} className="r-cell"></div>
                            );
                        })
                    }
                    </div>
                );
            })}
            </div>
        );
    }
}