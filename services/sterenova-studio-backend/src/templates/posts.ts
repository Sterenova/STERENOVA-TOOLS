import { svgOpen, svgClose, safeBox, logoBadge, headline, underline, subline, photo, panel, footer, WHITE } from './svg';

function post_hero_white() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(
		logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 96), underline(60, 260, 360),
		subline(60, 330, '{{SUBTITLE}}', 36), photo(60, 380, 960, 520, 24), footer(w, h - 120)
	);
	s.push(svgClose());
	return s.join('');
}

function post_hero_gradient() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 96), headline(60, 260, '{{TITLE}}', 96, true), subline(60, 320, '{{SUBTITLE}}', 38, 'muted', true), photo(60, 380, 960, 520, 24));
	s.push(svgClose());
	return s.join('');
}

function post_promo_pack() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(
		logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 86), underline(60, 260, 420),
		photo(60, 320, 960, 440, 24, '{{PHOTO_LABEL}}'),
		`<g id="pricing">${panel(60, 800, 520, 140)}<text x="100" y="880" font-family="Inter" font-size="36" class="muted">{{PRICE_LABEL}}</text>
            <text x="320" y="880" font-family="Inter" font-size="54" class="ink" font-weight="800">{{PRICE}}</text>
            <rect x="620" y="800" width="400" height="140" rx="18" class="accent"/>
            <text x="820" y="880" text-anchor="middle" font-family="Inter" font-size="36" fill="${WHITE}" font-weight="800">{{PROMO}}</text></g>`
	);
	s.push(svgClose());
	return s.join('');
}

function post_promo_big_discount() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 96), headline(60, 260, '{{TITLE}}', 92, true), subline(60, 320, '{{SUBTITLE}}', 40, 'muted', true), panel(60, 380, 960, 520, 24, false), subline(100, 700, '{{CODE}}', 50, 'muted', true));
	s.push(svgClose());
	return s.join('');
}

function post_catalog_2x2() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 86), underline(60, 260, 280));
	const x0 = 60, y0 = 320, wc = 480, hc = 330;
	const coords: Array<[number, number]> = [ [x0, y0], [x0 + 540, y0], [x0, y0 + 360], [x0 + 540, y0 + 360] ];
	coords.forEach((xy) => {
		const [tx, ty] = xy;
		s.push(panel(tx, ty, wc, hc));
		s.push(photo(tx + 20, ty + 20, wc - 40, 190, 14, '{{PRODUCT_PHOTO}}'));
		s.push(`<text x="${tx + 30}" y="${ty + hc - 70}" font-family="Inter" font-size="28" class="ink" font-weight="800">{{PRODUCT_NAME}}</text>`);
		s.push(`<text x="${tx + 30}" y="${ty + hc - 30}" font-family="Inter" font-size="26" class="muted">{{PRODUCT_PRICE}}</text>`);
	});
	s.push(svgClose());
	return s.join('');
}

function post_catalog_3x3() {
	const w = 1080, h = 1080, cols = 3, rows = 3; const cellW = Math.floor((w - 120 - (cols - 1) * 20) / cols), cellH = 280;
	const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 80), underline(60, 260, 460)];
	let y = 320; 
	for (let r = 0; r < rows; r++) {
		let x = 60;
		for (let c = 0; c < cols; c++) {
			s.push(panel(x, y, cellW, cellH, 18));
			s.push(photo(x + 12, y + 12, cellW - 24, 150, 12, '{{PRODUCT_PHOTO}}'));
			s.push(`<text x="${x + 18}" y="${y + cellH - 56}" font-family="Inter" font-size="24" class="ink" font-weight="800">{{PRODUCT_NAME}}</text>`);
			s.push(`<text x="${x + 18}" y="${y + cellH - 24}" font-family="Inter" font-size="22" class="muted">{{PRODUCT_PRICE}}</text>`);
			x += cellW + 20; 
		}
		y += cellH + 20;
	}
	s.push(svgClose());
	return s.join('');
}

function post_before_after_vertical() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 92), photo(60, 300, 480, 620, 24, '{{BEFORE_LABEL}}'), photo(540, 300, 480, 620, 24, '{{AFTER_LABEL}}'));
	s.push(svgClose());
	return s.join('');
}

function post_before_after_horizontal() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 92), photo(60, 300, 960, 300, 24, '{{BEFORE_LABEL}}'), photo(60, 660, 960, 300, 24, '{{AFTER_LABEL}}'));
	s.push(svgClose());
	return s.join('');
}

function post_testimonial_stats() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 260, '{{QUOTE}}', 80), subline(60, 320, '{{AUTHOR}}', 36)];
	s.push(photo(60, 380, 520, 480, 24, '{{PHOTO_LABEL}}'));
	s.push(panel(600, 380, 420, 220));
	s.push(`<text x="640" y="460" font-family="Inter" font-size="40" class="ink" font-weight="800">{{STAT_1_VALUE}}</text>`);
	s.push(`<text x="640" y="500" font-family="Inter" font-size="28" class="muted">{{STAT_1_LABEL}}</text>`);
	s.push(panel(600, 620, 420, 240));
	s.push(`<text x="640" y="700" font-family="Inter" font-size="40" class="ink" font-weight="800">{{STAT_2_VALUE}}</text>`);
	s.push(`<text x="640" y="740" font-family="Inter" font-size="28" class="muted">{{STAT_2_LABEL}}</text>`);
	s.push(svgClose());
	return s.join('');
}

function post_lineup() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 92)];
	let y = 320;
	['{{ARTIST_1}}', '{{ARTIST_2}}', '{{ARTIST_3}}', '{{ARTIST_4}}'].forEach((name) => {
		s.push(`<text x="60" y="${y}" font-family="Inter" font-size="48" class="ink" font-weight="800">${name}</text>`);
		y += 80;
	});
	s.push(photo(600, 320, 420, 520, 24, '{{POSTER_LABEL}}'));
	s.push(svgClose());
	return s.join('');
}

function post_quote_gradient() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h), logoBadge(60, 60, 96)];
	s.push(`<text x="60" y="600" font-family="Playfair Display" font-size="88" font-weight="800" fill="${WHITE}">{{QUOTE}}</text>`);
	s.push(`<text x="60" y="680" font-family="Inter" font-size="40" fill="${WHITE}" opacity="0.9">{{AUTHOR}}</text>`);
	s.push(svgClose());
	return s.join('');
}

function post_agenda_month() {
	const w = 1080, h = 1080, cols = 7, rows = 5; const cw = Math.floor((w - 120 - (cols - 1) * 8) / cols), ch = 120;
	const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 80), underline(60, 260, 520)];
	const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
	let x = 60; let y = 320;
	days.forEach((d) => { s.push(`<text x="${x}" y="${y}" font-family="Inter" font-size="26" class="muted">${d}</text>`); x += cw + 8; });
	y += 30;
	let num = 1;
	for (let r = 0; r < rows; r++) {
		x = 60;
		for (let c = 0; c < cols; c++) {
			s.push(panel(x, y, cw, ch));
			s.push(`<text x="${x + 12}" y="${y + 28}" font-family="Inter" font-size="24" class="muted">${num}</text>`);
			x += cw + 8; num += 1;
		}
		y += ch + 8;
	}
	s.push(svgClose());
	return s.join('');
}

function post_tips_slide(title = '{{TITLE}}') {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, title, 80), underline(60, 260, 520)];
	let y = 340;
	['{{TIP_1}}', '{{TIP_2}}', '{{TIP_3}}'].forEach((t) => {
		s.push(`<text x="60" y="${y}" font-family="Inter" font-size="40" class="ink" font-weight="700">• ${t}</text>`);
		y += 80;
	});
	s.push(svgClose());
	return s.join('');
}

function post_new_arrival() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h), logoBadge(60, 60, 96), headline(60, 260, '{{TITLE}}', 90, true), photo(60, 320, 960, 440, 24, '{{PHOTO_LABEL}}'), subline(60, 820, '{{SUBTITLE}}', 40, 'muted', true)];
	s.push(svgClose());
	return s.join('');
}

function post_collage_three() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 92), photo(60, 300, 640, 520, 24, '{{PHOTO_MAIN}}'), photo(720, 300, 300, 240, 20, '{{PHOTO_1}}'), photo(720, 580, 300, 240, 20, '{{PHOTO_2}}')];
	s.push(svgClose());
	return s.join('');
}

function post_staff_intro() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 90), underline(60, 260, 360)];
	let x = 60; const y = 320;
	for (let i = 0; i < 3; i++) {
		s.push(panel(x, y, 300, 620));
		s.push(photo(x + 20, y + 20, 260, 320, 18, '{{PORTRAIT_LABEL}}'));
		s.push(`<text x="${x + 30}" y="${y + 390}" font-family="Inter" font-size="34" class="ink" font-weight="800">{{NAME}}</text>`);
		s.push(`<text x="${x + 30}" y="${y + 430}" font-family="Inter" font-size="26" class="muted">{{ROLE}}</text>`);
		s.push(`<text x="${x + 30}" y="${y + 480}" font-family="Inter" font-size="24" class="muted">{{BIO}}</text>`);
		x += 340;
	}
	s.push(svgClose());
	return s.join('');
}

function post_faq() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h), logoBadge(60, 60), headline(60, 240, '{{TITLE}}', 90)];
	let y = 320;
	const qas: Array<[string, string]> = [
		['{{Q1}}', '{{A1}}'],
		['{{Q2}}', '{{A2}}'],
		['{{Q3}}', '{{A3}}'],
	];
	qas.forEach(([q, a]) => {
		s.push(panel(60, y, 960, 160));
		s.push(`<text x="90" y="${y + 60}" font-family="Inter" font-size="34" class="ink" font-weight="800">${q}</text>`);
		s.push(`<text x="90" y="${y + 110}" font-family="Inter" font-size="28" class="muted">${a}</text>`);
		y += 180;
	});
	s.push(svgClose());
	return s.join('');
}

function post_event_teaser() {
	const w = 1080, h = 1080; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h), logoBadge(60, 60, 96), headline(60, 260, '{{TITLE}}', 92, true), subline(60, 320, '{{SUBTITLE}}', 40, 'muted', true), photo(60, 380, 960, 520, 24, '{{PHOTO_LABEL}}')];
	s.push(svgClose());
	return s.join('');
}

export const POSTS: Record<string, string> = {
	'01_post_hero_white.svg': post_hero_white(),
	'02_post_hero_gradient.svg': post_hero_gradient(),
	'03_post_promo_pack.svg': post_promo_pack(),
	'04_post_promo_big_discount.svg': post_promo_big_discount(),
	'05_post_catalog_2x2.svg': post_catalog_2x2(),
	'06_post_catalog_3x3.svg': post_catalog_3x3(),
	'07_post_before_after_vertical.svg': post_before_after_vertical(),
	'08_post_before_after_horizontal.svg': post_before_after_horizontal(),
	'09_post_testimonial_stats.svg': post_testimonial_stats(),
	'10_post_lineup.svg': post_lineup(),
	'11_post_quote_gradient.svg': post_quote_gradient(),
	'12_post_agenda_month.svg': post_agenda_month(),
	'13_post_tips_slide.svg': post_tips_slide(),
	'14_post_new_arrival.svg': post_new_arrival(),
	'15_post_collage_three.svg': post_collage_three(),
	'16_post_staff_intro.svg': post_staff_intro(),
	'17_post_faq.svg': post_faq(),
	'18_post_event_teaser.svg': post_event_teaser(),
}; 