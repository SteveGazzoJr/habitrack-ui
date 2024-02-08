import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import EventCreator from './components/EventCreator.vue'
import EventFetcher from './components/EventFetcher.vue'

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
        path : '/eventcreator',
        component:EventCreator
    },{
        path : '/eventfetcher',
        component:EventFetcher
    }

]
})

const app= createApp(App);
app.use(router).mount('#app')