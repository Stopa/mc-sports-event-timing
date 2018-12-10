import {
  ADD_CORRIDOR_TIME,
  ADD_FINISHLINE_TIME,
} from '../constants/times';

export function addCorridorTime(time) {
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

export function addFinishLineTime(time) {
  return {
    type: ADD_FINISHLINE_TIME,
    payload: {
      code: time.code,
      clockTime: time.clockTime,
    },
  };
}
