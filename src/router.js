import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Game from './views/Game.vue';
import Login from './views/Login.vue';
import Scores from './views/Scores.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores,
    },
  ],
});
