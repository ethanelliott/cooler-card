import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import GameLoad from '../views/GameLoad.vue'
import Game from '../views/Game.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/loading',
        name: 'Loading',
        component: GameLoad
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
