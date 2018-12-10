import {
  ADD_CORRIDOR_TIME,
  ADD_FINISHLINE_TIME,
} from '../constants/times';

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CORRIDOR_TIME: {
      const { name, startNumber, code, clockTime: corridorTime } = action.payload;

      return {
        ...state,
        [code]: {
          name, startNumber, corridorTime,
        },
      };
    }
    case ADD_FINISHLINE_TIME: {
      const { code, clockTime: lineTime } = action.payload;

      const athlete = state[code];

      if (!athlete) {
        throw new Error(`Athlete with code ${code} not found.`);
      }

      const newAthlete = {
        ...athlete,
        lineTime,
      };

      return {
        ...state,
        [code]: newAthlete,
      };
    }
    default:
  }

  return state;
};
