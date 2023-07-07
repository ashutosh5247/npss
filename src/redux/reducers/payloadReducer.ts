import {ACTION_CONSTANTS} from '../actions/actions';

const initialState = {
  data: null,
};

const payloadReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case ACTION_CONSTANTS.DATA_FETCHED_FAILED:
      return {
        ...state,
        data: null,
      };
    case ACTION_CONSTANTS.DATA_FETCHED_SUCCESSFUL:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default payloadReducer;
