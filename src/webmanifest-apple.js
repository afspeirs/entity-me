const webmanifest = /**@type {HTMLLinkElement}*/(document.getElementById('webmanifest'));

if (import.meta.env.PROD && navigator.userAgent.search('Mac') !== -1 && webmanifest) {
  webmanifest.href = '/manifest-apple.webmanifest';
}
