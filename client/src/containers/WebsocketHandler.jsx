import React from 'react';
import { connect } from 'react-redux';

import {
  addCorridorTime, addFinishLineTime,
} from '../redux/actions/times';
import {
  CORRIDOR_TIMING_POINT_ID, FINISH_LINE_TIMING_POINT_ID
} from '../redux/constants/times';
import config from '../config';

class WebsocketHandler extends React.Component {
  componentDidMount() {
    this.socket = new WebSocket(config.websocket_url);

    this.socket.onmessage = this.handleSocketMessage.bind(this);
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }

  handleSocketMessage(message) {
    const messageJson = JSON.parse(message.data);
    console.log(messageJson);

    const {
      doAddCorridorTime, doAddFinishLineTime,
    } = this.props;

    if (messageJson.timingPoint === CORRIDOR_TIMING_POINT_ID) {
      doAddCorridorTime({
        name: messageJson.name,
        startNumber: messageJson.startNumber,
        code: messageJson.code,
        clockTime: messageJson.clockTime,
      });
    } else if (messageJson.timingPoint === FINISH_LINE_TIMING_POINT_ID) {
      doAddFinishLineTime({
        code: messageJson.code,
        clockTime: messageJson.clockTime,
      });
    }
  };

  render() {
    const { children } = this.props;

    return children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    doAddCorridorTime: time => dispatch(addCorridorTime(time)),
    doAddFinishLineTime: time => dispatch(addFinishLineTime(time)),
  };
}

export default connect(null, mapDispatchToProps)(WebsocketHandler);
