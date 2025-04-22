import './assets/main.css';
import 'primeicons/primeicons.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';

const app = createApp(App);

import {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    InputText,
    Password,
    Select,
    Button,
    Message,
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
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('Password', Password);
app.component('Select', Select);
app.component('Button', Button);
app.component('Message', Message);

app.mount('#app');
