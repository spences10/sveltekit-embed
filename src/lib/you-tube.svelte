<script>
  export let width = 560
  export let height = 315
  export let youTubeId
  export let autoPlay
  export let startTime
</script>

<div style={`position: relative; width: 100%;padding-top: 56.25%;`}>
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
