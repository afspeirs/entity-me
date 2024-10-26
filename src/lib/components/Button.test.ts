import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';

import Button from './Button.svelte';

describe('Button', () => {
  test('Button text found', () => {
    render(Button, {
      text: 'Example Button',
      onclick: () => {},
    });

    const buttonText = screen.getByText('Example Button');
    expect(buttonText).not.toHaveClass('sr-only');
  });

  test('Button iconOnly should not have visible text', () => {
    render(Button, {
      icon: 'rocket',
      iconOnly: true,
      text: 'Example Button',
      onclick: () => {},
    });

    const buttonText = screen.getByText('Example Button');
    expect(buttonText).toHaveClass('sr-only');
  });
});
