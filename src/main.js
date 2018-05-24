import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(require('vue-moment'));

import RepoList from './components/RepoList'
import PullRequests from './components/PullRequests'

const routes = [
  { path: '/', component: RepoList },
  { path: '/pullRequests/:login/:repo', component: PullRequests, name: 'pullRequests' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
}).$mount('#app')
