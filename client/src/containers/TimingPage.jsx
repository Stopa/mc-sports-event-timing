import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TimesTable from '../components/TimesTable';
import { addTime, fetchMissingTimes } from '../redux/actions/times';
import config from '../config';

class TimingPage extends React.Component {
  componentDidMount() {
    this.startSocket();

    this.stopBackgroundProcessesB = this.stopBackgroundProcesses.bind(this);
    this.resumeBackgroundProcessesB = this.resumeBackgroundProcesses.bind(this);

    window.addEventListener('blur', this.stopBackgroundProcessesB);
  }

  componentWillUnmount() {
    if (this.socket) {
      this.stopSocket();
    }

    window.removeEventListener('blur', this.stopBackgroundProcessesB);
  }

  startSocket() {
    this.socket = new WebSocket(`ws://${config.server_url}`);

    this.socket.onmessage = this.handleSocketMessage.bind(this);
  }

  stopSocket() {
    this.socket.close();

    delete this.socket;
  }

  stopBackgroundProcesses() {
    if (this.socket) {
      this.stopSocket();
    }

    this.pauseTime = new Date();
    window.addEventListener('focus', this.resumeBackgroundProcessesB);
  }

  resumeBackgroundProcesses() {
    const { doFetchMissingTimes } = this.props;

    this.startSocket();

    const resumeTime = new Date();

    doFetchMissingTimes(this.pauseTime, resumeTime);

    window.removeEventListener('focus', this.resumeBackgroundProcessesB);
  }

  handleSocketMessage(message) {
    const messageJson = JSON.parse(message.data);

    const { doAddTime } = this.props;

    doAddTime(messageJson);
  }

  render() {
    const { times } = this.props;

    return (
      <TimesTable times={times} />
    );
  }
}

TimingPage.propTypes = {
  times: PropTypes.arrayOf(PropTypes.object).isRequired,
  doAddTime: PropTypes.func.isRequired,
  doFetchMissingTimes: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    times: state.times,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    doAddTime: time => dispatch(addTime(time)),
    doFetchMissingTimes: (from, to) => dispatch(fetchMissingTimes(from, to)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimingPage);
