import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Home from '../views/Home.vue';
import Start from '../views/Start.vue';
import Game from '../views/Game.vue';
import CreateGame from '../views/CreateGame.vue';
import JoinPlayer from '../views/JoinPlayer.vue';
import JoinAudience from '../views/JoinAudience.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        props: true,
        path: '/start/:token',
        name: 'Start',
        component: Start
    },
    {
        path: '/join',
        name: 'Join',
        component: JoinPlayer
    },
    {
        path: '/spectate',
        name: 'Spectate',
        component: JoinAudience
    },
    {
        path: '/create',
        name: 'Create',
        component: CreateGame
    },
    {
        path: '/game',
        name: 'Game',
        component: Game
    }
]

const router = new VueRouter({
    routes
})

export default router
