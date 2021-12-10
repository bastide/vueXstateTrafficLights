import { createApp } from 'vue'
import App from './App.vue'
import { inspect } from "@xstate/inspect";
inspect({
  iframe: () => document.querySelector('iframe[data-xstate]'),
  url: 'https://statecharts.io/inspect'
});

createApp(App).mount('#app')
