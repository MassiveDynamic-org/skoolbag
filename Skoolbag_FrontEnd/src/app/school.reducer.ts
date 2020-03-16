import {ActionEx, SchoolActionTypes} from './school.action';
import * as _ from 'lodash';
export const initialState = [];
export function SchoolReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case SchoolActionTypes.Add:
      return [...state, action.payload];
    case SchoolActionTypes.Remove:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    case SchoolActionTypes.Update:
        state[action.payload.index] = action.payload.val;
        return [...state]
    default:
      return state;
  }
}