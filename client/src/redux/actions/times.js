import {
  ADD_CORRIDOR_TIME,
  ADD_FINISHLINE_TIME,
  CORRIDOR_TIMING_POINT_ID,
  FINISH_LINE_TIMING_POINT_ID,
} from '../constants/times';

import config from '../../config';

function addCorridorTime(time) {
  return {
    type: ADD_CORRIDOR_TIME,
    payload: {
      name: time.name,
      startNumber: time.startNumber,
      code: time.code,
      clockTime: time.clockTime,
    },
  };
};

function addFinishLineTime(time) {
  return {
    type: ADD_FINISHLINE_TIME,
    payload: {
      code: time.code,
      clockTime: time.clockTime,
    },
  };
}

export function addTime(time) {
  return (dispatch) => {
    if (time.timingPoint === CORRIDOR_TIMING_POINT_ID) {
      return dispatch(addCorridorTime({
        name: time.name,
        startNumber: time.startNumber,
        code: time.code,
        clockTime: time.clockTime,
      }));
    }

    if (time.timingPoint === FINISH_LINE_TIMING_POINT_ID) {
      return dispatch(addFinishLineTime({
        code: time.code,
        clockTime: time.clockTime,
      }));
    }

    throw new Error(`Unrecognized timing point: ${time.timingPoint}`);
  };
}

export function fetchMissingTimes(from, to) {
  return dispatch => fetch(`${config.rest_url}/times?from=${from.getTime()}&to=${to.getTime()}`)
    .then(response => response.json())
    .then((times) => {
      times.forEach(time => dispatch(addTime(time)));
    });
}
