// SEK money formatting — mirrors the prototype's kr() helper.
// 24380 → "24 380 kr", -890 → "−890 kr", +1240 with sign → "+1 240 kr".

const NBSP = ' ';

export function kr(amount: number, opts: { sign?: boolean } = {}): string {
  const abs = Math.abs(Math.round(amount));
  const grouped = abs.toLocaleString('sv-SE').replace(/\s/g, NBSP);
  let prefix = '';
  if (amount < 0) prefix = '−'; // U+2212 minus
  else if (opts.sign && amount > 0) prefix = '+';
  return `${prefix}${grouped}${NBSP}kr`;
}
