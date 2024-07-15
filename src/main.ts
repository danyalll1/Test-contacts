import './assets/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
});

const app =  createApp(App)

app
    .use(vuetify)
    .mount('#app')
