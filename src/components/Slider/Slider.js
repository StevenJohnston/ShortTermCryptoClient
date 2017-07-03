import Vue from 'vue';
import template from './Slider.pug';
import store from '../../store/store';
import { SET_PERIOD } from '../../store/mutation-types';
import noUiSlider from 'nouislider';
require('./Slider.styl');

export default Vue.component('Slider', {
  template: template,
  data () {
    return {
    };
  },
  mounted() {
    var select = document.getElementById('period');
    noUiSlider.create(select, {
      start: 0,
      step: 5,
      range: {
        min: 1,
        '14.3%': 5,
        '28.6%': 10,
        '42.9%': 15,
        '57.1%': 20,
        '71.4%': 30,
        '85.7%': 45,
        max: 60
      },
      snap: true,
      pips: {
        mode: 'values',
        values: [1,5,10,15,20,30,45,60],
        density: 5
      }
    });
    select.noUiSlider.on('slide', (value) => {
      store.dispatch(SET_PERIOD, {period: value * 1000 * 60});
    });
  }
});
