import Vue from 'vue'
import template from './PageHeader.pug';
require('./PageHeader.styl');

export default Vue.component('PageHeader', {
  template: template,
  data () {
    return {
      src: require('../../assets/logo.png')
    }
  }
})
