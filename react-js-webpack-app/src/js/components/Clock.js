import * as React from 'react';

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    console.log('Starting Clock');
    this.intervalID = setInterval(
      () => this.tick(),
      1000,
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    console.log('Stopping Clock');
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render() {
    const date = this.state.time;
    const time = date.toLocaleString('en-US', {
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
    });

    return (
      <div>
        <section>
          <h3>Ticking Clock</h3>
          The time is {time}
        </section>
      </div>
    );
  }
}

export default Clock;
