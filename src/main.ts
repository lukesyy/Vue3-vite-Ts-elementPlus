
import { createApp } from 'vue'
import App from './App.vue'
import VueRouter from './route'

// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import '@/styles/index.scss'

const app = createApp(App)
app.use(VueRouter)
app.mount('#app')
