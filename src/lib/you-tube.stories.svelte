<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'
  import YouTube from './you-tube.svelte'
</script>

<Meta
  title="YouTube"
  component={YouTube}
  argTypes={{
    width: { control: 'number' },
    height: { control: 'number' },
    youTubeId: { control: 'text' },
    autoPlay: { control: 'boolean' },
    aspectRatio: { control: 'text' },
    skipTo: { control: 'object' },
  }}
/>

<Template let:args>
  <YouTube {...args} />
</Template>

<Story
  name="Aspect Ratio"
  args={{
    youTubeId: 'mM5_T-F1Yn4',
    aspectRatio: '4:3',
  }}
/>

<Story
  name="Skip To"
  args={{
    youTubeId: 'PS2784YfPpw',
    skipTo: { h: 0, m: 38, s: 44 },
  }}
/>

<Story
  name="Auto Play"
  args={{
    youTubeId: 'mM5_T-F1Yn4',
    autoPlay: true,
  }}
/>
