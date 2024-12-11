type BeforeInstallPrompt = Event | null;
type UpdateAvailable = false | ((reloadPage?: boolean) => Promise<void>);

export const beforeInstallPrompt = $state({
  value: null as BeforeInstallPrompt,
  set(value: BeforeInstallPrompt) {
    this.value = value;
  },
});

export const updateAvailable = $state({
  value: false as UpdateAvailable,
  set(value: UpdateAvailable) {
    this.value = value;
  },
});
