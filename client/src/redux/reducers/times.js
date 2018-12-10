import {
  ADD_CORRIDOR_TIME,
  ADD_FINISHLINE_TIME,
} from '../constants/times';

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_CORRIDOR_TIME: {
      const {
        name, startNumber, code, clockTime: corridorTime,
      } = action.payload;

      return state.concat([{
        code, name, startNumber, corridorTime,
      }]);
    }
    case ADD_FINISHLINE_TIME: {
      const { code, clockTime: lineTime } = action.payload;

      let athleteFound = false;

      const newState = state.map((athlete) => {
        if (athlete.code === code) {
          athleteFound = true;

          return {
            ...athlete,
            lineTime,
          };
        }

        return athlete;
      });

      if (!athleteFound) {
        throw new Error(`Athlete with code ${code} not found.`);
      }

      return newState;
    }
    default:
  }

  return state;
};
