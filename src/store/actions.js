import {
  ADD_TICK
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
};
/*
export const setName = ({ dispatch }, payload) => {
  dispatch(types.SET_NAME, payload)
}
*/
