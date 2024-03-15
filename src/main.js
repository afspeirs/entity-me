import { registerServiceWorker } from '@afspeirs/service-worker';

import App from './App.svelte';
import './main.css';
import './webmanifest-apple';

const app = new App({
  target: document.getElementById('app'),
});

registerServiceWorker({
  register: import.meta.env.PROD,
});

export default app;
