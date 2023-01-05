/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}
  // interface Stuff {}
}

// https://stackoverflow.com/questions/73025100/svelte-svelte-kit-type-custom-action-event-with-typescript
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-getting-deprecation-warnings-for-sveltejsx--i-want-to-migrate-to-the-new-typings
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    'on:enterViewport'?: (event: any) => any
  }
}
