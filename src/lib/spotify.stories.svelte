<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
  import Spotify from './spotify.svelte'
</script>

<Meta
  title="Spotify"
  component={Spotify}
  argTypes={{
    spotifyLink: { control: 'string' },
    width: { control: 'string' },
    height: { control: 'string' },
  }}
/>

<Template let:args>
  <Spotify {...args} />
</Template>

<Story
  name="Width"
  args={{
    spotifyLink: 'album/65KwtzkJXw7oT819NFWmEP',
    width: '100%',
  }}
/>

<Story
  name="Height"
  args={{
    spotifyLink: 'album/65KwtzkJXw7oT819NFWmEP',
    height: '85px',
  }}
/>
