import Vue from 'vue';
import template from './app.pug';
import './app.styl';
import PageHeader from './components/PageHeader/PageHeader';
import Slider from './components/Slider/Slider';

export default Vue.component('App', {
  template: template,
  components: {
    'page-header': PageHeader,
    'slider': Slider
  },
  data () {
    return {
      src: require('./assets/logo.png')
    };
  }
});
