<script lang="ts">
  export let width = 560
  export let height = 315
  export let youTubeId = ''
  export let autoPlay = false
  export let aspectRatio = '16:9'
  export let skipTo = { h: 0, m: 0, s: 0 }

  const { h, m, s } = skipTo 

  const tH = h * 60
  const tM = m * 60

  const startTime = tH + tM + s

  export const getPadding = aspectRatio => {
    const config = {
      '1:1': `padding-top: 100%;`,
      '16:9': `padding-top: 56.25%;`,
      '4:3': `padding-top: 75%;`,
      '3:2': `padding-top: 66.66%;`,
      '8.5': `padding-top: 62.5%;`,
    }
    return config[aspectRatio]
  }
</script>

<div
  style={`
    position: relative;
    width: 100%;
    ${getPadding(aspectRatio)}
  `}
>
  <iframe
    {width}
    {height}
    class="youtube-mdx-embed"
    title={`youTube-${youTubeId}`}
    src={`https://www.youtube-nocookie.com/embed/${youTubeId}?&autoplay=${autoPlay}&start=${startTime}`}
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    style={`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
  />
</div>
