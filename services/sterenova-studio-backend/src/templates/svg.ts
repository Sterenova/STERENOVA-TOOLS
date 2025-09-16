export type RGB = { r: number; g: number; b: number };

function clamp01(x: number): number {
	return Math.max(0, Math.min(1, x));
}

function linToSrgb(u: number): number {
	if (u <= 0.0031308) return 12.92 * u;
	return 1.055 * Math.pow(Math.max(u, 0), 1 / 2.4) - 0.055;
}

export function oklchToSrgbHex(L: number, C: number, hDeg: number): string {
	const h = (hDeg * Math.PI) / 180;
	const a = C * Math.cos(h);
	const b = C * Math.sin(h);

	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;

	const l = l_ ** 3;
	const m = m_ ** 3;
	const s = s_ ** 3;

	const rLin = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
	const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
	const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

	const R = clamp01(linToSrgb(rLin));
	const G = clamp01(linToSrgb(gLin));
	const B = clamp01(linToSrgb(bLin));
	return `#${Math.round(R * 255)
		.toString(16)
		.padStart(2, '0')}${Math.round(G * 255)
		.toString(16)
		.padStart(2, '0')}${Math.round(B * 255)
		.toString(16)
		.padStart(2, '0')}`.toUpperCase();
}

export const CHARCOAL = oklchToSrgbHex(0.205, 0.0, 0.0);
export const PURPLE = oklchToSrgbHex(0.558, 0.288, 302.321);
export const WHITE = '#FFFFFF';

function tint(Lbase: number, Cbase: number, h: number, dL: number): string {
	const L = Math.max(0, Math.min(1, Lbase + dL));
	return oklchToSrgbHex(L, Cbase, h);
}

export const PURPLE_LIGHT = tint(0.558, 0.288, 302.321, 0.1);
export const PURPLE_DARK = tint(0.558, 0.288, 302.321, -0.12);
export const INK_MUTED = tint(0.205, 0.0, 0.0, 0.3);

export const PALETTE = {
	charcoal: CHARCOAL,
	purple: PURPLE,
	purple_light: PURPLE_LIGHT,
	purple_dark: PURPLE_DARK,
	white: WHITE,
	muted: INK_MUTED,
};

export function gradientCss(): string {
	return `:root {\n  --sterenova-charcoal: ${CHARCOAL};\n  --sterenova-purple: ${PURPLE};\n  --sterenova-purple-light: ${PURPLE_LIGHT};\n  --sterenova-purple-dark: ${PURPLE_DARK};\n  --sterenova-white: ${WHITE};\n}\n.bg-grad-oklch { background: linear-gradient(to right, oklch(0.205 0 0) 0%, oklch(0.558 0.288 302.321) 100%); }\n.bg-grad-srgb  { background: linear-gradient(90deg, ${CHARCOAL} 0%, ${PURPLE} 100%); }`;
}

export function styleBlock(): string {
	return `
  <defs>
    <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${CHARCOAL}"/>
      <stop offset="100%" stop-color="${PURPLE}"/>
    </linearGradient>
    <style type="text/css"><![CDATA[
      @font-face { font-family: 'Inter'; src: local('Inter'); }
      @font-face { font-family: 'Playfair Display'; src: local('Playfair Display'); }
      .bg-white { fill: ${WHITE}; }
      .bg-grad { fill: url(#brandGrad); }
      .ink { fill: ${CHARCOAL}; }
      .muted { fill: ${INK_MUTED}; }
      .accent { fill: ${PURPLE}; }
      .accent-dark { fill: ${PURPLE_DARK}; }
      .accent-light { fill: ${PURPLE_LIGHT}; }
    ]]></style>
  </defs>
`;
}

export function svgOpen(width: number, height: number): string {
	return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n${styleBlock()}`;
}

export function svgClose(): string {
	return '</svg>\n';
}

export function safeBox(w: number, h: number, m = 60): string {
	return `<rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}" fill="none" stroke="${INK_MUTED}" stroke-dasharray="8 8" opacity="0.25"/>`;
}

export function logoBadge(x: number, y: number, diam = 96): string {
	const r = diam / 2;
	return `<g id="logo">
      <circle cx="${x + r}" cy="${y + r}" r="${r}" fill="url(#brandGrad)"/>
      <text x="${x + r}" y="${y + r + 8}" text-anchor="middle" font-family="Inter" font-size="${diam * 0.35}" fill="${WHITE}" font-weight="800">S</text>
    </g>`;
}

export function headline(x: number, y: number, txt: string, size: number, white = false): string {
	const fill = white ? WHITE : CHARCOAL;
	return `<text x="${x}" y="${y}" font-family="Playfair Display" font-weight="800" font-size="${size}" fill="${fill}">${txt}</text>`;
}

export function subline(x: number, y: number, txt: string, size: number, klass = 'muted', white = false): string {
	if (white) return `<text x="${x}" y="${y}" font-family="Inter" font-size="${size}" fill="${WHITE}" opacity="0.9">${txt}</text>`;
	return `<text x="${x}" y="${y}" font-family="Inter" font-size="${size}" class="${klass}">${txt}</text>`;
}

export function underline(x: number, y: number, w: number, h = 8, white = false): string {
	const fill = white ? WHITE : PURPLE;
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}"/>`;
}

export function photo(x: number, y: number, w: number, h: number, rx = 24, label = 'Ajoutez votre photo'): string {
	return `<g id="ph"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" fill="${CHARCOAL}" opacity="0.06"/>
      <text x="${x + w / 2}" y="${y + h / 2}" text-anchor="middle" font-family="Inter" font-size="${Math.min(w, h) * 0.05}" class="muted">${label}</text></g>`;
}

export function panel(x: number, y: number, w: number, h: number, rx = 18, white = true): string {
	const fill = white ? WHITE : CHARCOAL;
	const opt = white ? '' : ' opacity="0.06"';
	return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${opt}/>`;
}

export function footer(w: number, y: number, handle = '{{HANDLE}}', cta = '{{CTA}}'): string {
	return `<g id="f"><rect x="0" y="${y}" width="${w}" height="120" fill="${CHARCOAL}"/>
      <text x="60" y="${y + 70}" font-family="Inter" font-size="36" fill="${WHITE}" font-weight="700">${cta}</text>
      <text x="${w - 60}" y="${y + 70}" text-anchor="end" font-family="Inter" font-size="34" fill="${WHITE}">${handle}</text></g>`;
} 