export const getPadding = (aspectRatio: string): string => {
  const config = {
    '1:1': `padding-top: 100%;`,
    '16:9': `padding-top: 56.25%;`,
    '4:3': `padding-top: 75%;`,
    '3:2': `padding-top: 66.66%;`,
    '8.5': `padding-top: 62.5%;`,
  }

  return config[aspectRatio]
}

export const createScriptTag = (
  providerEmbedUrl: string | null,
  providerEmbedScript: string | null
): void => {
  const script = document.createElement(`script`)

  script.type = `text/javascript`

  if (providerEmbedUrl) {
    script.src = providerEmbedUrl
  }

  if (providerEmbedScript) {
    script.innerText = providerEmbedScript
  }

  script.onerror = error => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.error(
      `SvelteKitEmbedProvider ${(error as any).type}`,
      error
    )
  }

  document.getElementsByTagName(`head`)[0].appendChild(script)
}
