import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import { page } from '$app/state';

export type ModalName = 'settings';

export const modals = {
  get active() {
    return page.state.showModal;
  },
  isOpen(name: ModalName) {
    return page.state.showModal === name;
  },
  open(name: ModalName) {
    return goto(resolve('/'), {
      shallow: true,
      state: { showModal: name },
    });
  },
  close() {
    if (typeof window === 'undefined') return;
    window.history.back();
  },
};
