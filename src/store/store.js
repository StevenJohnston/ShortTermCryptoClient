import Vuex from 'vuex';
import Vue from 'vue';
import {
  ADD_TICK,
} from './mutation-types';
import { actions } from './actions';

console.log(actions);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markets: {}
  },
  getters: {
    getMarkets: state => {
      return state.markets;
    }
  },
  mutations: {
    [ADD_TICK] (state, payload) {
      if (!state.markets[payload.MarketName]) {
        let newMarket = { };
        newMarket[payload.MarketName] = [];
        state.markets = Object.assign({}, state.markets, newMarket);
      }

      state.markets = {
        ...state.markets,
        [payload.MarketName]: [
          ...state.markets[payload.MarketName],
          payload
        ]
      };
      state.markets[payload.MarketName].push(payload);
    },
  },
  actions: actions
});
