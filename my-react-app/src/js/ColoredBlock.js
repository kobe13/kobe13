import React from 'react';
import ChangeColorButton from './ChangeColorButton.js';

export default class ColoredBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red'
        };
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor() {
        this.setState((prevState, props) => ({
            color: prevState.color === 'red' ? 'blue' : 'red'
        }));
    }

    render() {
        return (
            <div
                style={{margin: '0 auto', padding: '25px 0 0 0', height: '50px', width: '200px', backgroundColor: this.state.color}}>
                <ChangeColorButton clickHandler={this.changeColor} currentColor={this.state.color}/>
            </div>
        )
    }
}
