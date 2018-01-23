import * as React from 'react';

interface HeaderProps {
    month:number;
    year: number;
    monthNames: string[];
    onPrevClick: ()=>void;
    onNextClick: ()=>void;
}
export default class Header extends React.Component<HeaderProps, {}> {
    render(){
        return(
            <div className="flex space-between header">
                <i className="fa fa-chevron-left" onClick={() => this.props.onPrevClick() }>Prev</i>
                { this.props.monthNames[this.props.month] } - { this.props.year }
                <i className="fa fa-chevron-right" onClick={() => this.props.onNextClick() }>Next</i>
            </div>
        )
    }
}