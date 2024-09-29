export function updateServiceWorker(updateAvailable: boolean) {
  if (updateAvailable) {
    window.location.reload();
  } else {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => registration.update());
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  }
}
