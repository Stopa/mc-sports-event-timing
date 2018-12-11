import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import './AthleteBlock.css';

import config from '../config';

export default class AthleteBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.timeCorridorB = this.timeCorridor.bind(this);
    this.timeLineB = this.timeLine.bind(this);
  }

  timeCorridor() {
    const time = new Date();

    this.setState({
      corridorTime: time,
    });

    this.saveTime(time, 'finishCorridor');
  }

  timeLine() {
    const time = new Date();

    this.setState({
      lineTime: time,
    });

    this.saveTime(time, 'finishLine');
  }

  saveTime(time, timingPoint) {
    const { code } = this.props;

    fetch(`${config.server_url}/times`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clockTime: (time / 1000).toFixed(1),
        timingPoint,
        code,
      }),
    })
      .then(response => response.json())
      .then((json) => {
        if (json.status !== 'ok') {
          throw new Error('Error saving time');
        }
      });
  }

  render() {
    const { name } = this.props;

    const { corridorTime, lineTime } = this.state;

    return (
      <article className="athlete-block">
        <h2>{ name }</h2>
        <div className="athlete-block__buttons">
          <button
            type="button"
            onClick={() => this.timeCorridorB()}
            disabled={corridorTime !== undefined}
          >
            {
              corridorTime ? moment(corridorTime).format('HH:mm:ss.S') : 'Save corridor time'
            }
          </button>
          <button
            type="button"
            onClick={() => this.timeLineB()}
            disabled={lineTime !== undefined || corridorTime === undefined}
          >
            {
              lineTime ? moment(lineTime).format('HH:mm:ss.S') : 'Save line time'
            }
          </button>
        </div>
      </article>
    );
  }
}

AthleteBlock.propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
};
