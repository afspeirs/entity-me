import tippy, { type Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';

type Options = Partial<Props>;

export function tooltip(element: HTMLElement, options: Options) {
  // create tooltip
  const tooltip = tippy(element, options);

  return {
    update(options: Options) {
      tooltip.setProps(options);
    },
    destroy() {
      tooltip.destroy();
    },
  };
}
