export function hexToRgba(hex: string, alpha: number = 1): string {
  // # işaretini temizle
  hex = hex.replace(/^#/, '');

  // 3 karakterli ise 6 karaktere dönüştür (#abc => #aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(c => c + c)
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error('Geçersiz hex kodu');
  }

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default hexToRgba;
