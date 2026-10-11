import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_FATHOM_ID: { public: true, static: true },
	PUBLIC_FATHOM_URL: { public: true, static: true },
});
