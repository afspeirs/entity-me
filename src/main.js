import App from './App.svelte';
import './main.css';
import { registerServiceWorker } from './registerServiceWorker';
import './webmanifest-apple';

const app = new App({
  target: document.getElementById('app'),
});

registerServiceWorker();

export default app;
