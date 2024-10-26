import { render, screen } from '@testing-library/svelte';
// import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';

import Header from './Header.svelte';

describe('Header', () => {
  beforeEach(() => render(Header));

  test('Header text found', () => {
    const element = screen.getByText('EntityMe');
    expect(element).toBeInTheDocument();
  });
});
