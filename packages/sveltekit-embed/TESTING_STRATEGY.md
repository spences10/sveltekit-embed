# Testing Strategy & Best Practices

<!-- cspell:ignore dialog -->

This document outlines the comprehensive testing strategy for this
SvelteKit project, covering both client-side Svelte component testing
and server-side Node.js testing.

## Table of Contents

- [Overview](#overview)
- [Testing Architecture](#testing-architecture)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Testing Svelte Components](#testing-svelte-components)
- [Testing Server-Side Rendering (SSR)](#testing-server-side-rendering-ssr)
- [Testing Node.js/Server Code](#testing-nodejs-server-code)
- [Testing Utilities](#testing-utilities)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)

## Overview

This project uses a modern testing setup with **Vitest** as the test
runner and **vitest-browser-svelte** for component testing. The
testing strategy is split into three main environments:

1. **Browser Environment**: For testing Svelte components using real
   browser APIs
2. **Server Environment**: For testing server-side rendering (SSR) of
   Svelte components
3. **Node Environment**: For testing server-side utilities, API logic,
   and pure functions

## Testing Architecture

### Workspace Configuration

The project uses Vitest workspaces to separate client and server
testing:

```typescript
// vite.config.ts
test: {
  workspace: [
    {
      // Client-side tests (Svelte components)
      extends: './vite.config.ts',
      test: {
        name: 'client',
        environment: 'browser',
        browser: {
          enabled: true,
          provider: 'playwright',
          instances: [{ browser: 'chromium' }]
        },
        include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
        exclude: ['src/lib/server/**', 'src/**/*.ssr.{test,spec}.{js,ts}'],
        setupFiles: ['./vitest-setup-client.ts'],
      },
    },
    {
      // SSR tests (Server-side rendering)
      extends: './vite.config.ts',
      test: {
        name: 'ssr',
        environment: 'node',
        include: ['src/**/*.ssr.{test,spec}.{js,ts}'],
      },
    },
    {
      // Server-side tests (Node.js utilities)
      extends: './vite.config.ts',
      test: {
        name: 'server',
        environment: 'node',
        include: ['src/**/*.{test,spec}.{js,ts}'],
        exclude: [
          'src/**/*.svelte.{test,spec}.{js,ts}',
          'src/**/*.ssr.{test,spec}.{js,ts}'
        ],
      },
    },
  ],
}
```

## Dependencies

### Core Testing Dependencies

```json
{
	"vitest": "^3.1.4",
	"@vitest/browser": "^3.1.4",
	"vitest-browser-svelte": "^0.1.0",
	"playwright": "^1.52.0",
	"@playwright/test": "^1.52.0"
}
```

### Key Features

- **Real Browser Testing**: Tests run in actual Chromium browser
- **Svelte 5 Support**: Native support for `$state`, `$derived`, and
  other runes
- **No Mocking Required**: Real DOM APIs eliminate need for complex
  mocks
- **Fast Execution**: Playwright provides efficient browser automation

## Configuration

### Client Setup (`vitest-setup-client.ts`)

```typescript
/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />
```

The setup is minimal because we use real browser APIs instead of
mocks.

## Testing Svelte Components

### File Naming Convention

Svelte component tests use the `.svelte.test.ts` extension:

- `Component.svelte` → `Component.svelte.test.ts`

### Basic Component Test Structure

```typescript
import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { flushSync } from 'svelte';
import MyComponent from './MyComponent.svelte';

describe('MyComponent', () => {
	test('renders with default props', async () => {
		render(MyComponent);
		const element = page.getByTestId('my-element');
		await expect.element(element).toHaveTextContent('Expected Text');
	});
});
```

### Testing Component Props

```typescript
test('renders with custom props', async () => {
	render(MyComponent, {
		props: {
			title: 'Custom Title',
			isVisible: true,
		},
	});

	const titleElement = page.getByText('Custom Title');
	await expect.element(titleElement).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
test('handles click events', async () => {
	render(MyComponent);
	const button = page.getByRole('button');

	await button.click();
	// No flushSync() needed - locators automatically retry!

	const result = page.getByText('Clicked');
	await expect.element(result).toBeInTheDocument();
});
```

### Testing Reactive State (Svelte 5 Runes)

```typescript
test('reactive state updates', async () => {
	const props = $state({ count: 0 });
	render(Counter, { props });

	const counter = page.getByTestId('counter');
	await expect.element(counter).toHaveTextContent('0');

	props.count = 5;
	// No flushSync() needed - locators automatically wait for updates!

	await expect.element(counter).toHaveTextContent('5');
});
```

#### Testing $derived Runes and Avoiding Warnings

When testing `$derived` runes in test files, you may encounter
warnings about "state referenced locally". To resolve these warnings,
use the `untrack` function from Svelte:

```typescript
import { flushSync, untrack } from 'svelte';

test('derived state logic', async () => {
	let scrollState = $state({
		current: 0,
		previous: 0,
	});

	// Derived state that mimics component logic
	let shouldShowButton = $derived(
		scrollState.current > scrollState.previous &&
			scrollState.current > 0,
	);

	// Use untrack to access derived values without warnings
	expect(untrack(() => shouldShowButton)).toBe(false);

	// Update state
	scrollState.previous = scrollState.current;
	scrollState.current = 100;
	flushSync();

	expect(untrack(() => shouldShowButton)).toBe(true);
});
```

**Why use `untrack`?**

- Prevents "state_referenced_locally" warnings when accessing
  `$derived` values in tests
- Allows you to test reactive logic without creating unwanted reactive
  dependencies
- Essential for testing complex derived state patterns outside of
  component context

**When to use `untrack`:**

- Accessing `$derived` values in test assertions
- Testing reactive logic that uses `$derived.by()` functions
- Any time you get "state referenced locally" warnings in test files

### Testing with Custom Styles

```typescript
test('applies custom CSS classes', async () => {
	render(MyComponent, {
		props: { styles: 'custom-class' },
	});

	const element = page.getByTestId('styled-element');
	await expect.element(element).toHaveClass('custom-class');
});
```

### Comprehensive Component Testing Patterns

Based on real-world testing experience, here are comprehensive
patterns for testing Svelte components:

#### 1. Complete Test Coverage Structure

```typescript
describe('Component Name', () => {
	describe('Initial Rendering', () => {
		// Test all component variants and default states
		it('should render with default props', async () => {});
		it('should render with custom props', async () => {});
		it('should handle missing props gracefully', async () => {});
	});

	describe('Rune State Management', () => {
		// Test reactive state patterns with Svelte 5 runes
		it('should manage state with $state rune', async () => {});
		it('should test state transitions', async () => {});
		it('should handle derived state correctly', async () => {});
	});

	describe('CSS Classes and Styling', () => {
		// Test styling logic and conditional classes
		it('should apply correct CSS classes for each variant', async () => {});
		it('should test CSS class derivation logic', async () => {});
	});

	describe('User Interactions', () => {
		// Test click, hover, keyboard interactions
		it('should handle click events', async () => {});
		it('should respond to keyboard input', async () => {});
	});

	describe('Content Rendering', () => {
		// Test different content types and edge cases
		it('should render HTML content', async () => {});
		it('should handle plain text', async () => {});
		it('should handle empty content', async () => {});
		it('should handle special characters', async () => {});
	});

	describe('Edge Cases', () => {
		// Test boundary conditions and error states
		it('should handle empty props', async () => {});
		it('should handle very long content', async () => {});
		it('should handle invalid data gracefully', async () => {});
	});

	describe('Accessibility', () => {
		// Test ARIA attributes, semantic structure
		it('should have proper ARIA roles', async () => {});
		it('should be keyboard accessible', async () => {});
		it('should maintain semantic structure', async () => {});
	});

	describe('Component Structure', () => {
		// Test DOM structure and layout
		it('should have correct DOM structure', async () => {});
		it('should maintain consistent spacing', async () => {});
	});

	describe('Advanced Patterns', () => {
		// Test complex reactive patterns and lifecycle
		it('should handle complex state interactions', async () => {});
		it('should manage component lifecycle correctly', async () => {});
	});
});
```

#### 2. Rune Testing Best Practices

```typescript
// ✅ Comprehensive rune testing pattern
test('should test complex reactive logic', async () => {
	// Set up reactive state
	let componentState = $state({
		currentValue: 'initial',
		previousValue: null,
		changeCount: 0,
	});

	// Create derived state that mimics component logic
	let hasChanged = $derived(
		componentState.currentValue !== componentState.previousValue,
	);

	let isValid = $derived(
		componentState.currentValue.length > 0 &&
			componentState.changeCount >= 0,
	);

	// Test initial state
	expect(untrack(() => hasChanged)).toBe(true); // null !== 'initial'
	expect(untrack(() => isValid)).toBe(true);

	// Test state transitions
	componentState.previousValue = componentState.currentValue;
	componentState.currentValue = 'updated';
	componentState.changeCount++;
	flushSync(); // Still needed for immediate derived state evaluation

	expect(untrack(() => hasChanged)).toBe(true);
	expect(untrack(() => isValid)).toBe(true);
	expect(componentState.changeCount).toBe(1);
});
```

#### 3. Testing Component Variants

```typescript
// ✅ Test all component variants systematically
const componentVariants = [
	{ type: 'info', expectedClass: 'bg-info' },
	{ type: 'warning', expectedClass: 'bg-warning' },
	{ type: 'success', expectedClass: 'bg-success' },
	{ type: 'error', expectedClass: 'bg-error' },
];

componentVariants.forEach(({ type, expectedClass }) => {
	test(`should render ${type} variant correctly`, async () => {
		render(Component, { props: { type } });

		const element = page.getByRole('alert');
		await expect.element(element).toHaveClass(expectedClass);
	});
});
```

#### 4. Testing HTML Content Safely

```typescript
// ✅ Test HTML content rendering with proper expectations
test('should render HTML content correctly', async () => {
	render(Component, {
		props: {
			message:
				'Text with <strong>bold</strong> and <a href="#">link</a>',
		},
	});

	// Test semantic elements rather than exact HTML structure
	const strongElement = page.getByText('bold');
	const linkElement = page.getByRole('link');

	await expect.element(strongElement).toBeInTheDocument();
	await expect.element(linkElement).toBeInTheDocument();
	await expect.element(linkElement).toHaveAttribute('href', '#');
});
```

### Using Locators vs Container Queries

The modern approach uses **locators** from the `page` object instead
of manual DOM queries. This provides better reliability and follows
testing best practices.

#### Why Locators Are Superior

**Automatic Retrying**: Locators automatically retry assertions until
elements are updated, eliminating the need for `flushSync()` and
`tick()` in most cases. As noted by Vladimir from the Vitest team:
"You shouldn't even need flushSync and tick anymore now because
locators retry the assertion" and "flushSync is also useful only when
your whole test is sync, but all Vitest locators and matchers are
async to make sure the elements received all the updates before making
the assertion."

#### Locator Methods

```typescript
// Semantic queries (preferred)
page.getByRole('button'); // Find by ARIA role
page.getByRole('button', { name: 'Submit' }); // Find by role and accessible name
page.getByLabel('Email address'); // Find by associated label
page.getByPlaceholder('Enter your email'); // Find by placeholder text
page.getByText('Welcome'); // Find by text content

// Test ID queries (when semantic queries aren't possible)
page.getByTestId('submit-button'); // Find by data-testid attribute

// Other useful queries
page.getByTitle('Close dialog'); // Find by title attribute
page.getByAltText('Profile picture'); // Find by alt text (images)
```

#### Locator Best Practices

1. **Prefer semantic queries**: Use `getByRole`, `getByLabel`, etc.
   over `getByTestId`
2. **Always await assertions**:
   `await expect.element(locator).toBeInTheDocument()`
3. **Use descriptive test IDs**:
   `data-testid="user-profile-edit-button"`
4. **Combine locators**:
   `page.getByRole('dialog').getByRole('button', { name: 'Close' })`
5. **No manual waiting needed**: Locators handle waiting for DOM
   updates automatically

#### Migration from Container Queries

```typescript
// ❌ Old approach (container queries)
test('finds button', () => {
	const { container } = render(MyComponent);
	const button = container.querySelector('[data-testid="submit"]');
	expect(button?.textContent).toBe('Submit');
});

// ✅ New approach (locators)
test('finds button', async () => {
	render(MyComponent);
	const button = page.getByTestId('submit');
	await expect.element(button).toHaveTextContent('Submit');
});
```

#### When to Use Container Queries

While locators are preferred, container queries are still useful for:

- Testing DOM structure and hierarchy
- Accessing elements that don't have semantic meaning
- Complex CSS selector requirements
- Testing implementation details (use sparingly)

```typescript
test('maintains proper DOM structure', () => {
	const { container } = render(MyComponent);
	const wrapper = container.firstElementChild;
	expect(wrapper?.tagName).toBe('DIV');
	expect(wrapper?.children.length).toBe(2);
});
```

#### When `flushSync()` Is Still Needed

While locators eliminate the need for `flushSync()` in most cases, you
may still need it when:

1. **Testing synchronous code paths**: When your entire test is
   synchronous
2. **Testing non-DOM state**: When testing reactive state that doesn't
   immediately affect the DOM
3. **Complex derived state**: When testing `$derived` values that need
   immediate evaluation

```typescript
// ✅ Still need flushSync for testing derived state directly
test('derived state logic', async () => {
	let scrollState = $state({ current: 0, previous: 0 });
	let shouldShow = $derived(
		scrollState.current > scrollState.previous,
	);

	expect(untrack(() => shouldShow)).toBe(false);

	scrollState.current = 100;
	flushSync(); // Needed for immediate derived state evaluation

	expect(untrack(() => shouldShow)).toBe(true);
});

// ✅ No flushSync needed when testing DOM updates with locators
test('component updates DOM', async () => {
	render(MyComponent);
	const button = page.getByRole('button');

	await button.click();
	// Locators automatically wait for DOM updates

	await expect.element(page.getByText('Updated')).toBeInTheDocument();
});
```

### Testing Server-Side Rendering (SSR)

For testing how components render on the server side, you can use
Svelte's built-in `render` function from `svelte/server`:

```typescript
// Component.ssr.test.ts
import { describe, expect, test } from 'vitest';
import { render } from 'svelte/server';
import MyComponent from './MyComponent.svelte';

describe('MyComponent SSR', () => {
	test('renders correctly on server', () => {
		const { body } = render(MyComponent, {
			props: { name: 'World' },
		});

		expect(body).toContain('Hello, World!');
	});

	test('generates proper HTML structure', () => {
		const { body, head, css } = render(MyComponent, {
			props: { title: 'Test Page' },
		});

		expect(body).toContain('<h1>Test Page</h1>');
		expect(head).toContain('<title>Test Page</title>');
		expect(css.code).toContain('.my-component');
	});
});
```

**Key differences from client-side testing:**

- Uses `render` from `svelte/server` instead of
  `vitest-browser-svelte`
- Returns `{ body, head, css }` object instead of container
- Tests the actual HTML string output
- No DOM interaction or browser APIs available
- Perfect for testing initial render and SEO-related content

### Testing Svelte 5 Classes (.svelte.ts files)

```typescript
// doubler.svelte.ts
export class Doubler {
	#getNumber;
	#double = $derived(this.#getNumber() * 2);

	constructor(getNumber: () => number) {
		this.#getNumber = getNumber;
	}

	get value() {
		return this.#double;
	}
}

// doubler.svelte.test.ts
import { describe, expect, it } from 'vitest';
import { Doubler } from './doubler.svelte.ts';

describe('doubler.svelte.ts', () => {
	it('should double initial value', () => {
		let value = $state(1);
		let doubler = new Doubler(() => value);
		expect(doubler.value).toBe(2);
	});

	it('should be reactive', () => {
		let value = $state(0);
		let doubler = new Doubler(() => value);
		expect(doubler.value).toBe(0);

		value = 2;
		expect(doubler.value).toBe(4);
	});
});
```

## Testing Server-Side Rendering (SSR)

Server-side rendering testing is crucial for ensuring your components
render correctly on the server, which is important for SEO, initial
page load performance, and ensuring your app works without JavaScript.

### File Naming Convention

SSR tests use the `.ssr.test.ts` extension:

- `Component.svelte` → `Component.ssr.test.ts`

### Basic SSR Test Structure

```typescript
import { describe, expect, test } from 'vitest';
import { render } from 'svelte/server';
import MyComponent from './MyComponent.svelte';

describe('MyComponent SSR', () => {
	test('renders with props', () => {
		const { body } = render(MyComponent, {
			props: { name: 'World' },
		});

		expect(body).toContain('Hello, World!');
	});
});
```

### Testing HTML Output

```typescript
test('generates correct HTML structure', () => {
	const { body } = render(ProductCard, {
		props: {
			title: 'Test Product',
			price: 29.99,
			inStock: true,
		},
	});

	expect(body).toContain('<h2>Test Product</h2>');
	expect(body).toContain('$29.99');
	expect(body).toContain('In Stock');
	expect(body).not.toContain('Out of Stock');
});
```

### Testing Head Content

```typescript
test('generates proper head content', () => {
	const { head } = render(SEOComponent, {
		props: {
			title: 'My Page Title',
			description: 'Page description',
		},
	});

	expect(head).toContain('<title>My Page Title</title>');
	expect(head).toContain(
		'<meta name="description" content="Page description">',
	);
});
```

### Testing CSS Generation

```typescript
test('generates component styles', () => {
	const { css } = render(StyledComponent, {
		props: { theme: 'dark' },
	});

	expect(css.code).toContain('.component');
	expect(css.code).toContain('background-color');
});
```

### Testing Conditional Rendering

```typescript
test('conditionally renders content based on props', () => {
	// Test when user is logged in
	const { body: loggedInBody } = render(UserProfile, {
		props: { user: { name: 'John', isLoggedIn: true } },
	});

	expect(loggedInBody).toContain('Welcome, John!');
	expect(loggedInBody).not.toContain('Please log in');

	// Test when user is not logged in
	const { body: loggedOutBody } = render(UserProfile, {
		props: { user: { isLoggedIn: false } },
	});

	expect(loggedOutBody).toContain('Please log in');
	expect(loggedOutBody).not.toContain('Welcome');
});
```

### Testing with Context

```typescript
test('renders with context', () => {
	const context = new Map([
		['theme', 'dark'],
		['user', { id: 1, name: 'Alice' }],
	]);

	const { body } = render(ContextAwareComponent, {
		props: {},
		context,
	});

	expect(body).toContain('dark-theme');
	expect(body).toContain('Hello, Alice');
});
```

### SSR vs Client-Side Testing

| Aspect           | SSR Testing                   | Client-Side Testing                   |
| ---------------- | ----------------------------- | ------------------------------------- |
| **Import**       | `render` from `svelte/server` | `render` from `vitest-browser-svelte` |
| **Environment**  | Node.js                       | Browser (Playwright)                  |
| **Output**       | `{ body, head, css }`         | `{ container }`                       |
| **Interactions** | None                          | Click, type, etc.                     |
| **Use Case**     | Initial render, SEO           | User interactions, reactivity         |
| **Browser APIs** | Not available                 | Available                             |

### When to Use SSR Testing

- **SEO Content**: Testing meta tags, titles, structured data
- **Initial Render**: Ensuring components render without JavaScript
- **Performance**: Testing that critical content is server-rendered
- **Accessibility**: Ensuring semantic HTML structure
- **Static Content**: Testing content that doesn't require
  interactivity

### SSR Testing Best Practices

1. **Test Critical Paths**: Focus on components that affect SEO and
   initial load
2. **Verify HTML Structure**: Ensure proper semantic markup
3. **Test Edge Cases**: Empty states, missing props, error conditions
4. **Keep Tests Simple**: SSR tests should focus on output, not logic
5. **Complement Client Tests**: Use alongside browser tests, not
   instead of

## Testing Node.js/Server Code

### File Naming Convention

Server-side tests use the `.test.ts` extension:

- `utils.ts` → `utils.test.ts`

### Basic Server Test Structure

```typescript
import { describe, expect, test } from 'vitest';
import { myUtilFunction } from './utils';

describe('myUtilFunction', () => {
	test('returns expected result', () => {
		const result = myUtilFunction('input');
		expect(result).toBe('expected output');
	});
});
```

### Testing with Mocks

```typescript
import { describe, expect, test, vi } from 'vitest';
import { formatDistanceStrict } from 'date-fns';

// Mock external dependencies
vi.mock('date-fns', () => ({
	formatDistanceStrict: vi.fn(),
}));

test('formats date correctly', () => {
	const mockDate = '2023-01-01';
	const mockResult = '2 months ago';

	vi.mocked(formatDistanceStrict).mockReturnValue(mockResult);

	const result = formatDate(mockDate);
	expect(result).toBe(mockResult);
});
```

### Testing Window/Browser APIs in Node Environment

When testing utilities that use browser APIs, mock them appropriately:

```typescript
test('handles window.scrollY', () => {
	// Mock window.scrollY for Node environment
	Object.defineProperty(window, 'scrollY', {
		value: 100,
		writable: true,
	});

	const result = checkScrollPosition();
	expect(result).toBe(true);
});
```

## Testing Utilities

### Common Test Utilities

```typescript
// Test helper for rendering components with common props
function renderWithDefaults(Component: any, props = {}) {
	return render(Component, {
		props: {
			// Default props
			theme: 'light',
			...props,
		},
	});
}

// Test helper for waiting for async operations
async function waitForElement(container: Element, selector: string) {
	return new Promise(resolve => {
		const observer = new MutationObserver(() => {
			const element = container.querySelector(selector);
			if (element) {
				observer.disconnect();
				resolve(element);
			}
		});

		observer.observe(container, { childList: true, subtree: true });
	});
}
```

## Best Practices

### 1. Use Data Test IDs

```svelte
<!-- Test -->
<script>
	const button = container.querySelector(
		'[data-testid="submit-button"]',
	);
</script>

<!-- Component.svelte -->
<button data-testid="submit-button">Submit</button>
```

### 2. Test User Behavior, Not Implementation

```typescript
// ❌ Testing implementation details
test('calls internal method', () => {
	const component = render(MyComponent);
	expect(component.internalMethod).toHaveBeenCalled();
});

// ✅ Testing user behavior
test('shows success message after form submission', async () => {
	const { container } = render(ContactForm);

	await container.querySelector('[data-testid="submit"]').click();

	expect(container.textContent?.includes('Success!')).toBe(true);
});
```

### 3. Use Descriptive Test Names

```typescript
// ❌ Vague test names
test('button works', () => {});

// ✅ Descriptive test names
test('shows loading state when form is submitting', () => {});
test('displays error message when email is invalid', () => {});
```

### 4. Group Related Tests

```typescript
describe('ContactForm', () => {
	describe('validation', () => {
		test('shows error for invalid email', () => {});
		test('shows error for empty required fields', () => {});
	});

	describe('submission', () => {
		test('shows loading state during submission', () => {});
		test('shows success message on successful submission', () => {});
	});
});
```

### 5. Clean Up After Tests

```typescript
import { afterEach, vi } from 'vitest';

afterEach(() => {
	vi.resetAllMocks();
	// Reset any global state
});
```

### 6. Use `untrack` for Derived Values in Tests

When testing `$derived` runes, always use `untrack` to avoid warnings
and ensure you're testing the current value:

```typescript
import { untrack } from 'svelte';

// ✅ Proper way to test derived values
test('derived state updates correctly', () => {
	let count = $state(0);
	let doubled = $derived(count * 2);

	expect(untrack(() => doubled)).toBe(0);

	count = 5;
	flushSync();

	expect(untrack(() => doubled)).toBe(10);
});
```

### 7. Avoid Over-Mocking in Browser Environment

When using `vitest-browser-svelte` with Playwright, prefer real
browser APIs over mocks:

```typescript
// ❌ Unnecessary mocking in browser environment
beforeEach(() => {
	vi.mock('IntersectionObserver', () => ({
		observe: vi.fn(),
		unobserve: vi.fn(),
		disconnect: vi.fn(),
	}));
});

// ✅ Let real browser APIs work
beforeEach(() => {
	// No mocking needed - real browser environment
});
```

**When to mock**:

- External API calls
- File system operations
- Date/time functions for deterministic tests
- Third-party libraries with side effects

**When NOT to mock**:

- Browser APIs (IntersectionObserver, ResizeObserver, etc.)
- DOM manipulation
- CSS animations and transitions
- Viewport and scroll behavior

### 8. Embrace Locator Auto-Retry Behavior

**Key Insight**: Locators automatically retry assertions, eliminating
the need for manual synchronization in most cases.

```typescript
// ❌ Old pattern with manual synchronization
test('updates after click', async () => {
	render(MyComponent);
	const button = page.getByRole('button');

	await button.click();
	flushSync(); // Usually not needed!

	await expect.element(page.getByText('Updated')).toBeInTheDocument();
});

// ✅ New pattern - let locators handle waiting
test('updates after click', async () => {
	render(MyComponent);
	const button = page.getByRole('button');

	await button.click();
	// Locators automatically wait for DOM updates

	await expect.element(page.getByText('Updated')).toBeInTheDocument();
});
```

**When you still need `flushSync()`**:

- Testing derived state directly (not DOM updates)
- Synchronous test patterns
- Non-DOM reactive state testing

## Common Patterns

### Testing Forms

```typescript
test('validates form input', async () => {
	render(ContactForm);

	const emailInput = page.getByLabel('Email address');
	const submitButton = page.getByRole('button', { name: 'Submit' });

	// Test invalid email
	await emailInput.fill('invalid-email');
	await submitButton.click();
	flushSync();

	const errorMessage = page.getByText('Invalid email');
	await expect.element(errorMessage).toBeInTheDocument();
});
```

### Testing Conditional Rendering

```typescript
test('shows content when condition is met', async () => {
	render(ConditionalComponent, {
		props: { showContent: true },
	});

	const content = page.getByTestId('content');
	await expect.element(content).toBeInTheDocument();
});

test('hides content when condition is not met', async () => {
	render(ConditionalComponent, {
		props: { showContent: false },
	});

	const content = page.getByTestId('content');
	await expect.element(content).not.toBeInTheDocument();
});
```

### Testing Async Operations

```typescript
test('loads data asynchronously', async () => {
	const { container } = render(AsyncComponent);

	// Wait for loading to complete
	await vi.waitFor(() => {
		expect(container.textContent?.includes('Loading...')).toBe(false);
	});

	expect(container.textContent?.includes('Data loaded')).toBe(true);
});
```

## CI/CD Integration

### Playwright Container Optimization

For optimal CI performance, use the official Playwright Docker
container. This provides significant speed improvements by eliminating
browser installation time.

#### GitHub Actions Configuration

```yaml
# .github/workflows/unit-test.yml
jobs:
  unit-tests:
    name: Run unit tests
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright:v1.52.0-noble
      options: --user 1001

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4.1.0
      - uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: 'pnpm'
      - name: Install dependencies
        run: pnpm install
      - name: Test
        run: pnpm run test:ci
```

#### Performance Benefits

- **30% faster execution**: Pre-installed browsers eliminate download
  time
- **Optimized environment**: Container tuned specifically for browser
  testing
- **Better resource allocation**: Efficient memory and CPU usage for
  testing workloads
- **Consistent environment**: Same browser versions across all CI runs

#### Important Notes

- Use `--user 1001` to avoid permission issues with file system access
- Match Playwright container version with your project dependencies
- Container approach works for both unit tests and E2E tests
- Larger projects see even more significant time savings

#### Alternative CI Configurations

For other CI providers, similar container approaches can be used:

```yaml
# GitLab CI
test:
  image: mcr.microsoft.com/playwright:v1.52.0-noble
  script:
    - npm ci
    - npm run test:ci

# CircleCI
jobs:
  test:
    docker:
      - image: mcr.microsoft.com/playwright:v1.52.0-noble
    steps:
      - checkout
      - run: npm ci
      - run: npm run test:ci
```

## Running Tests

### Available Commands

```bash
# Run all tests
pnpm test

# Run only unit tests (both client and server)
pnpm test:unit

# Run only client-side tests (Svelte components)
pnpm test:client

# Run only SSR tests (Server-side rendering)
pnpm test:ssr

# Run only server-side tests (Node.js utilities)
pnpm test:server

# Run tests in watch mode
pnpm test:unit

# Run tests with UI
pnpm test:ui

# Run tests for CI
pnpm test:ci

# Run with coverage
pnpm coverage

# Run E2E tests
pnpm test:e2e
```

### Running Specific Tests

```bash
# Run specific test file
pnpm vitest src/lib/components/Button.svelte.test.ts

# Run tests matching pattern
pnpm vitest --grep "Button component"

# Run tests in specific directory
pnpm vitest src/lib/utils/
```

## Troubleshooting

### Common Issues

#### 1. Over-Mocking in Browser Environment

**Problem**: Mocking browser APIs like `IntersectionObserver` when
using real browser testing.

**Solution**: In `vitest-browser-svelte` with Playwright, use real
browser APIs instead of mocks:

```typescript
// ❌ Don't mock in real browser environment
vi.mock('IntersectionObserver', () => ({
	observe: vi.fn(),
	unobserve: vi.fn(),
	disconnect: vi.fn(),
}));

// ✅ Let real browser APIs work
// No mocking needed - IntersectionObserver works natively in Playwright
```

**Why**: Real browser testing eliminates the need for complex mocks
and provides more accurate test results.

#### 2. "global is not defined" Error

**Problem**: Using `global.window` in browser environment tests.

**Solution**: Use `window` directly or `Object.defineProperty`:

```typescript
// ❌ Don't use global in browser tests
global.window.scrollY = 100;

// ✅ Use window directly or Object.defineProperty
Object.defineProperty(window, 'scrollY', {
	value: 100,
	writable: true,
});
```

#### 2. Tests Not Finding Elements

**Problem**: Elements not found after interactions.

**Solution**: Use locators instead of manual DOM queries - they
automatically retry:

```typescript
// ❌ Old approach - manual DOM queries need flushSync
button.click();
flushSync(); // Ensure DOM updates are applied
expect(
	container.querySelector('[data-testid="result"]'),
).toBeTruthy();

// ✅ New approach - locators automatically wait
await button.click();
await expect.element(page.getByTestId('result')).toBeInTheDocument();
```

#### 3. Async Test Issues

**Problem**: Tests failing due to timing issues.

**Solution**: Use `vi.waitFor()` for async operations:

```typescript
await vi.waitFor(() => {
	expect(container.textContent?.includes('Expected text')).toBe(true);
});
```

#### 4. Mock Not Working

**Problem**: Mocks not being applied correctly.

**Solution**: Ensure mocks are set up before imports:

```typescript
// ❌ Mock after import
import { myFunction } from './module';
vi.mock('./module');

// ✅ Mock before import
vi.mock('./module', () => ({
	myFunction: vi.fn(),
}));
import { myFunction } from './module';
```

#### 5. Svelte 5 Rune Warnings in Tests

**Problem**: Getting "state referenced locally" warnings when using
`$derived` in test files.

**Solution**: Use `untrack` to access derived values:

```typescript
import { untrack } from 'svelte';

// ❌ Direct access causes warnings
expect(derivedValue).toBe(expectedValue);

// ✅ Use untrack to avoid warnings
expect(untrack(() => derivedValue)).toBe(expectedValue);
```

**Why this happens**: `$derived` values accessed outside of Svelte's
reactive context (like in test assertions) only capture their initial
values and generate warnings. `untrack` allows you to access the
current value without creating reactive dependencies.

#### 6. Multiple Element Matches in Locators

**Problem**: Locators matching multiple elements causing "strict mode
violation" errors.

**Solution**: Use `.first()`, `.last()`, or `.nth()` to specify which
element:

```typescript
// ❌ Matches multiple elements
const element = page.getByText(/common-word/);

// ✅ Specify which element you want
const element = page.getByText(/common-word/).first();
const element = page.getByText(/common-word/).last();
const element = page.getByText(/common-word/).nth(1);
```

**Alternative**: Use more specific locators:

```typescript
// ✅ More specific selector
const element = page.getByTestId('specific-element');
const element = page.getByRole('button', { name: 'Specific Button' });
```

#### 7. Locator Chaining Not Supported

**Problem**: Attempting to chain `.locator()` method on existing
locators causes TypeScript errors.

**Solution**: Use alternative approaches for finding nested elements:

```typescript
// ❌ Chaining locators (not supported in vitest-browser-svelte)
const banner = page.getByRole('banner');
const link = banner.locator('a'); // Error: Property 'locator' does not exist

// ✅ Use semantic queries from page object
const banner = page.getByRole('banner');
const link = page.getByRole('link'); // Find link anywhere on page

// ✅ Use more specific selectors
const link = page.getByRole('link', { name: 'specific link text' });

// ✅ Use test IDs for complex nested structures
const link = page.getByTestId('banner-link');
```

**Why this happens**: The vitest-browser-svelte API doesn't support
Playwright's `.locator()` chaining method. Instead, it provides
semantic query methods that work globally on the page.

**Best practices for nested elements**:

1. Use semantic queries with specific names/text
2. Add test IDs to complex nested structures
3. Test the overall behavior rather than specific DOM hierarchy
4. Focus on user-facing functionality over implementation details

#### 7. Locator Chaining Not Supported

**Problem**: Attempting to chain `.locator()` method on existing
locators causes TypeScript errors.

**Solution**: Use alternative approaches for finding nested elements:

```typescript
// ❌ Chaining locators (not supported in vitest-browser-svelte)
const banner = page.getByRole('banner');
const link = banner.locator('a'); // Error: Property 'locator' does not exist

// ✅ Use semantic queries from page object
const banner = page.getByRole('banner');
const link = page.getByRole('link'); // Find link anywhere on page

// ✅ Use more specific selectors
const link = page.getByRole('link', { name: 'specific link text' });

// ✅ Use test IDs for complex nested structures
const link = page.getByTestId('banner-link');
```

**Why this happens**: The vitest-browser-svelte API doesn't support
Playwright's `.locator()` chaining method. Instead, it provides
semantic query methods that work globally on the page.

**Best practices for nested elements**:

1. Use semantic queries with specific names/text
2. Add test IDs to complex nested structures
3. Test the overall behavior rather than specific DOM hierarchy
4. Focus on user-facing functionality over implementation details

#### 8. Reactive State Testing with Runes

**Problem**: Testing complex reactive state logic with `$derived` and
`$state` runes can be challenging.

**Solution**: Use comprehensive rune testing patterns:

```typescript
// ✅ Test reactive state transitions
test('should test banner type state transitions', async () => {
	let bannerState = $state({
		currentType: 'info' as BannerOptions['type'],
		previousType: null as BannerOptions['type'] | null,
		changeCount: 0,
	});

	// Derived state for tracking changes
	let hasTypeChanged = $derived(
		bannerState.currentType !== bannerState.previousType,
	);

	// Test initial state
	expect(untrack(() => hasTypeChanged)).toBe(true);

	// Simulate state change
	bannerState.previousType = bannerState.currentType;
	bannerState.currentType = 'warning';
	bannerState.changeCount++;
	flushSync();

	expect(untrack(() => hasTypeChanged)).toBe(true);
});

// ✅ Test derived state that doesn't update properly
test('should re-derive classes after state change', async () => {
	let styleState = $state({ bannerType: 'info' });
	let currentColors = $derived(COLORS[styleState.bannerType]);

	// Test type changes - create new derived after state change
	styleState.bannerType = 'warning';
	flushSync();

	// Re-derive the classes after state change for testing
	let updatedClasses = $derived(
		`${untrack(() => currentColors).bg} ${untrack(() => currentColors).text}`,
	);

	expect(untrack(() => updatedClasses)).toContain('bg-warning');
});
```

**Key insights**:

- Always use `untrack()` when accessing `$derived` values in tests
- Use `flushSync()` after state changes to ensure updates are applied
- For complex derived state, sometimes you need to re-derive after
  state changes in tests
- Test the reactive logic patterns, not just the component rendering

### Debugging Tips

1. **Use `console.log(container.innerHTML)`** to inspect rendered HTML
2. **Use `screen.debug()`** equivalent:
   `console.log(container.outerHTML)`
3. **Check browser dev tools** when running tests with `--ui` flag
4. **Use `test.only()`** to run single tests during debugging
5. **Use `vi.waitFor()`** for timing-sensitive assertions
6. **Test string lengths carefully** - HTML content may have different
   character counts than expected
7. **Use semantic queries over DOM structure** - focus on user-facing
   elements rather than implementation details

## Migration Notes

This project was migrated from `@testing-library/svelte` to
`vitest-browser-svelte`. Key changes:

1. **Import changes**: `render` now comes from `vitest-browser-svelte`
2. **Query methods**: Use `container.querySelector()` instead of
   `screen.getByTestId()`
3. **No more mocking**: Real browser APIs eliminate need for
   window/document mocks
4. **Better Svelte 5 support**: Native support for runes and reactive
   state

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [vitest-browser-svelte](https://github.com/vitest-dev/vitest-browser-svelte)
- [Playwright Documentation](https://playwright.dev/)
- [Svelte Testing Best Practices](https://svelte.dev/docs/testing)
- [Svelte 5 Runes](https://svelte.dev/docs/runes)

---

This testing strategy ensures comprehensive coverage of both
client-side Svelte components and server-side Node.js code, providing
a robust foundation for maintaining code quality and preventing
regressions.
