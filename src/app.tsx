import * as React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
//import TodoApp from './components/todo/todoApp.component';
import configureStore from './store/store';
import RtCalender from './components/rt-calender/calender.component';
import AddEvent from './components/rt-calender/addEvent.component';

const store = configureStore();

class App extends React.Component {
    render(){
      return(
        <div>
          <AddEvent/>
          <RtCalender />
        </div>
      )
    }
}

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("root")
);