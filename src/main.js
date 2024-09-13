import { createApp } from 'vue'; // Correct import for Vue 3
import App from './App.vue';
import router from './router'; // Import the router

const app = createApp(App);
app.use(router); // Use the router
app.mount('#app');
