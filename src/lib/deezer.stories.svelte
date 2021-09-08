<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
  import Deezer from './deezer.svelte'
</script>

<Meta
  title="Deezer"
  component={Deezer}
  argTypes={{
    theme: { control: 'string' },
    frameSrc: { control: 'string' },
    width: { control: 'string' },
    height: { control: 'string' },
  }}
/>

<Template let:args>
  <Deezer {...args} />
</Template>

<Story
  name="Width"
  args={{
    frameSrc: 'playlist/8980854742',
    width: '100%',
  }}
/>

<Story
  name="Height"
  args={{
    frameSrc: 'playlist/8980854742',
    height: '85px',
  }}
/>

<Story
  name="Theme"
  args={{
    theme: 'light',
    frameSrc: 'playlist/8980854742',
    height: '85px',
  }}
/>
