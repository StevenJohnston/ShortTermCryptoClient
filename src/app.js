import Vue from 'vue';
import template from './app.pug';
import './app.styl';
import PageHeader from './components/PageHeader/PageHeader';

export default Vue.component('App', {
  template: template,
  components: {
    'page-header': PageHeader
  },
  data () {
    return {
      src: require('./assets/logo.png')
    };
  }
});
