import Vue from 'vue';
import template from './Markets.pug';
import store from '../../store/store';
import { ADD_TICK, SET_PERIOD } from '../../store/mutation-types';
import getClient from '../../store/modules/apiClient';
import { mapGetters } from 'vuex';
import _ from 'lodash';
let client = getClient();
require('./Markets.styl');

export default Vue.component('Markets', {
  template: template,
  data () {
    return {
      period: store.state.period,
      markets: {}
    };
  },
  methods: {
    priceDown() {
      console.log('price down');
      return _.orderBy(_.filter(this.markets, market => market.priceChangeAsNum < 0), ['priceChangeAsNum'], ['asc']);
    },
    priceUp() {
      return _.orderBy(_.filter(this.markets, market => market.priceChangeAsNum > 0), ['priceChangeAsNum'], ['desc']);
    },
    openMarket(market) {
      window.open('https://www.bittrex.com/Market/Index?MarketName=' + market, '_blank');
    }
  },
  created() {
    client.on('say', function(message) {
      if (message.room == 'tick') {
        store.dispatch(ADD_TICK, message.message);
      }
    });
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case ADD_TICK:
          if (!this.markets[mutation.payload.MarketName]) {
            Vue.set(this.markets, mutation.payload.MarketName, { MarketName: mutation.payload.MarketName, priceChange: 'Awaiting additional trades'});
            Vue.set(this.markets[mutation.payload.MarketName], 'ticks', []);
          }
          this.markets[mutation.payload.MarketName].ticks.push(mutation.payload);
          let now = new Date();
          let removeBefore = _.findIndex(this.markets[mutation.payload.MarketName].ticks, (tick) => {
            return now - new Date(tick.TimeStamp + 'Z') < this.period;
          });
          this.markets[mutation.payload.MarketName].ticks.splice(0, removeBefore);
          if (this.markets[mutation.payload.MarketName].ticks.length) {
            let first = this.markets[mutation.payload.MarketName].ticks[0];
            let last = this.markets[mutation.payload.MarketName].ticks[this.markets[mutation.payload.MarketName].ticks.length - 1] || first;
            this.markets[mutation.payload.MarketName].priceChange = (last.Last / first.Last * 100 - 100).toFixed(3);
            this.markets[mutation.payload.MarketName].priceChangeAsNum = Number((last.Last / first.Last * 100 - 100).toFixed(3));
          } else {
            this.markets[mutation.payload.MarketName].priceChange = 0;
          }
        break;
        case SET_PERIOD:
          this.period = state.period;
          this.markets = {};
          for (var key in store.state.markets) {
            if (store.state.markets.hasOwnProperty(key)) {
              Vue.set(this.markets, key, {MarketName: key, priceChange: 'Awaiting additional trades'});
              Vue.set(this.markets[key], 'ticks', [...store.state.markets[key].ticks]);
              let now = new Date();
              let removeBefore = _.findIndex(this.markets[key].ticks, (tick) => {
                return now - new Date(tick.TimeStamp + 'Z') < this.period;
              });
              this.markets[key].ticks.splice(0, removeBefore);
              let first = this.markets[key].ticks[0];
              let last = this.markets[key].ticks[this.markets[key].ticks.length - 1] || first;
              this.markets[key].priceChange = (last.Last / first.Last * 100 - 100).toFixed(3);
              this.markets[key].priceChangeAsNum = Number((last.Last / first.Last * 100 - 100).toFixed(3));

            }
          }
        break;
        default:

      }
    });
  }
});
