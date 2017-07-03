import Vuex from 'vuex';
import Vue from 'vue';
import {
  ADD_TICK,
  SET_PERIOD
} from './mutation-types';
import { actions } from './actions';

console.log(actions);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markets: {},
    period: 1000 * 60
  },
  mutations: {
    [ADD_TICK] (state, payload) {
      if (!state.markets[payload.MarketName]) {
        let newMarket = { };
        newMarket[payload.MarketName] = {
          MarketName: payload.MarketName,
          ticks: []
        };
        Object.assign(state.markets, newMarket);
      }
      state.markets[payload.MarketName] = {
        ...state.markets[payload.MarketName],
        ticks: [
          ...state.markets[payload.MarketName].ticks,
          payload
        ]
      };
      //state.markets[payload.MarketName].push(payload);
      console.log('red');
      console.log(_.reduce(state.markets, (r,v) => {
        return r + v.ticks.length;
      }, 0));
    },
    [SET_PERIOD] (state, payload) {
      state.period = payload.period;
    }
  },
  actions: actions
});
