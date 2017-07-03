import {
  ADD_TICK,
  SET_PERIOD
} from './mutation-types';
import apiClient from './modules/apiClient';
let client = apiClient();
export const actions = {
  [ADD_TICK] ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      commit(ADD_TICK, payload);
      resolve();
    });
  },
  [SET_PERIOD] ({commit, state}, payload) {
    return new Promise((resolve, reject) => {
      commit(SET_PERIOD, payload);
      resolve();
    });
  }
};
/*
export const setName = ({ dispatch }, payload) => {
  dispatch(types.SET_NAME, payload)
}
*/
