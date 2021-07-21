<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
  import Vimeo from './vimeo.svelte'
</script>

<Meta
  title="Vimeo"
  component={Vimeo}
  argTypes={{
    vimeoId: { control: 'text' },
    autoPlay: { control: 'boolean' },
    aspectRatio: { control: 'text' },
    skipTo: { control: 'object' },
  }}
/>

<Template let:args>
  <Vimeo {...args} />
</Template>

<Story
  name="Skip To"
  args={{
    vimeoId: '38445453',
    skipTo: {
      h: 0,
      m: 1,
      s: 15,
    },
  }}
/>

<Story
  name="Auto Play"
  args={{
    vimeoId: '38445453',
    autoPlay: true,
  }}
/>
