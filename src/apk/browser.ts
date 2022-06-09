function arrayBufferToImage(data: ArrayBuffer): string {
  const blob = new Blob([data], { type: 'image/png' })
  const url = URL.createObjectURL(blob)
  return url
}

export {
  arrayBufferToImage
}