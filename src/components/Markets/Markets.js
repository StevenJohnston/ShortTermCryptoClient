import Vue from 'vue';
import template from './Markets.pug';
import store from '../../store/store';
import { ADD_TICK } from '../../store/mutation-types';
import getClient from '../../store/modules/apiClient';
import { mapGetters } from 'vuex';
import _ from 'lodash';
let client = getClient();
require('./Markets.styl');

export default Vue.component('Markets', {
  template: template,
  data () {
    return {
      period: 1000 * 60 * 0.5
    };
  },
  computed: {
    getMarkets() {
      let toArray = _.values(store.getters.getMarkets);
      let withPeriod = toArray.map((market) => {
        let filteredMarket = market.filter((tick) => {
          return (((new Date()) - new Date(tick.TimeStamp)) < this.period);
        });
        return {
          MarketName: filteredMarket[0].MarketName,
          Last: _.last(filteredMarket).Last,
          priceChange: _.last(filteredMarket).Last / filteredMarket[0].Last * 100 - 100
        };

      }).filter(market => market.priceChange);

      let ordered = _.orderBy(withPeriod, ['priceChange', 'MarketName'], ['desc']);
      return ordered;
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
        break;
        default:

      }
    });
  }
});
