import { redirect } from '@sveltejs/kit';

// The index lives on the home page
export const load = () => redirect(308, '/');
