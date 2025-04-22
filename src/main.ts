import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';

const app = createApp(App);

import {
    DataTable,
    InputText,
    Button
} from "primevue";

app.use(createPinia())
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Material,
        options: {
            darkModeSelector: false,
        }
    }
});

app.component('DataTable', DataTable);
app.component('InputText', InputText);
app.component('Button', Button);

app.mount('#app');
