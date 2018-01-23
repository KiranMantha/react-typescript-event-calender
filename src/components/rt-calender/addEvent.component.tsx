import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { addEvent } from '../../store/actions/rt-calender_actions';

interface AddEventProps {
    addEvent: (date:string, event:string) => any;
}

class addevent extends React.Component<AddEventProps, {}> {
    dateInput: HTMLInputElement;
    eventInput:HTMLInputElement;
    addEvent:any;

    constructor(props:any){
        super(props);
        this.addEvent
    }

    _addEvent = (date:string, event:string) => {
        this.props.addEvent(date, event);
        this.dateInput.value = '';
        this.eventInput.value = '';
    }

    render(){
        return(
            <div>
                <h4>Add Event</h4>
                <p>date(MM/DD/YYYY): <input ref={node => {
                this.dateInput = node;
                }} type="text"/></p>
                <p>event: <input ref={node => {
                this.eventInput = node;
                }}  type="text"/></p>
                <button onClick={ () => this._addEvent(this.dateInput.value, this.eventInput.value)  }>Add Event</button>
                <hr/>
            </div>
        )
    }
}

//inject the data to state of component
function mapStateToProps(state:any) {
    return { }
}


//inject the actions to props
function mapDispatchToProps(dispatch:Dispatch<any>) {
    return bindActionCreators({
        addEvent: addEvent
    }, dispatch)
}

const AddEvent = connect(mapStateToProps, mapDispatchToProps)(addevent);
export default AddEvent;