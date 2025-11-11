export function getContrastTextColor(hex?: string) {
  if (!hex) return "#000"
  try {
    let h = hex.replace('#', '')
    if (h.length === 3) {
      h = h.split('').map((c) => c + c).join('')
    }
    const r = parseInt(h.substring(0, 2), 16)
    const g = parseInt(h.substring(2, 4), 16)
    const b = parseInt(h.substring(4, 6), 16)
    // relative luminance approximation
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luminance > 160 ? '#000' : '#fff'
  } catch (e) {
    return '#000'
  }
}

export default getContrastTextColor
