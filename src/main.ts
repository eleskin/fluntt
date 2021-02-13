import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

library.add(faUser, faBell);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(store).use(router).mount('#app');
