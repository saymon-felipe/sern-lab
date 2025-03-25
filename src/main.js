import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import $ from 'jquery';

const app = createApp(App);

app.config.globalProperties.$writeText = (element, speed = 40) => {
    return new Promise((resolve) => {
        let elem = $(element);
        let text = elem.text();
        elem.text("");
        elem.css("opacity", 1);

        let i = 0;
        function escrever() {
            if (i < text.length) {
                elem.append(text.charAt(i));
                i++;
                setTimeout(escrever, speed);
            } else {
                resolve();
            }
        }

        escrever();
    })
}

app.mount('#app');
