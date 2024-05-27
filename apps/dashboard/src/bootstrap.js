import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';
import PrimeVue from 'primevue/config';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Chart from 'primevue/chart';
import ProgressBar from 'primevue/progressbar';

// Mount function to start up the app
const mount = (el) => {
    const app = createApp(Dashboard);
    app.use(PrimeVue);
    app.component('Calendar', Calendar);
    app.component('Checkbox', Checkbox);
    app.component('Panel', Panel);
    app.component('Dropdown', Dropdown);
    app.component('InputText', InputText);
    app.component('Button', Button);
    app.component('Column', Column);
    app.component('DataTable', DataTable);
    app.component('Chart', Chart);
    app.component('ProgressBar', ProgressBar);
    app.mount(el);
};

// If we are in development and in isolation,
// call mount immediately

if(process.env.NODE_ENV === 'development'){
    const devRoot = document.querySelector('#_dashboard-dev-root');
    
    if(devRoot){
        mount(devRoot);
    }
}

// We are running through container
// and we should export the mount function
export { mount };