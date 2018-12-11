import React from 'react';
import moment from 'moment';

import './Timer.css';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: new Date(),
    };
  }

  componentDidMount() {
    this.setTimeout();
  }

  componentWillUnmount() {
    if (this.timeout) {
      window.clearTimeout(this.timeout);
    }
  }

  setTimeout() {
    this.timeout = window.setTimeout(this.tick.bind(this), 100);
  }

  tick() {
    this.setState({
      time: new Date(),
    });

    this.setTimeout();
  }

  render() {
    const { time } = this.state;

    return (
      <div className="timer">{ moment(time).format('HH:mm:ss.S') }</div>
    );
  }
}
