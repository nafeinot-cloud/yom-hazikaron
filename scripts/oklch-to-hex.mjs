// Convert oklch(L% C H) to an sRGB hex string (Björn Ottosson's public OKLab formulas).
function oklchToHex(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;

  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const gamma = (c) => {
    c = Math.min(1, Math.max(0, c));
    return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };
  r = gamma(r); g = gamma(g); bl = gamma(bl);

  const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, '0');
  return '#' + toHex(r) + toHex(g) + toHex(bl);
}

console.log('gold      oklch(60% 0.11 55) ->', oklchToHex(0.60, 0.11, 55));
console.log('gold-soft oklch(92% 0.05 55) ->', oklchToHex(0.92, 0.05, 55));
console.log('bg        oklch(97.5% 0.015 75) ->', oklchToHex(0.975, 0.015, 75));
console.log('text      oklch(27% 0.02 55) ->', oklchToHex(0.27, 0.02, 55));

export { oklchToHex };
