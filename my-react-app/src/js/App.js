import React, {Component} from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import Clock from './Clock';
import ColoredBlock from './ColoredBlock';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to my React Testing Zone</h2>
                </div>
                <div className="App-content">
                    <p className="App-intro">
                        Hello {this.props.name} {this.props.surname}!
                    </p>
                    <Clock />
                    <ColoredBlock />
                </div>
            </div>
        );
    }
}
