import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url: { pathname } }) => {
  if (pathname === '/') return;

  redirect(303, '/');
};

export const prerender = true;
export const ssr = false;
