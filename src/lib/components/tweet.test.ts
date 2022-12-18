import Tweet from '$lib/components/tweet.svelte'
import { cleanup, render } from '@testing-library/svelte'
import { afterEach, describe, expect, it } from 'vitest'

describe('Tweet', () => {
  afterEach(() => cleanup())

  it('mounts', () => {
    const { container } = render(Tweet)
    expect(container).toBeTruthy()
  })
})
