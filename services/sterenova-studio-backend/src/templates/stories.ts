import { svgOpen, svgClose, safeBox, logoBadge, headline, subline, photo, panel, WHITE, PURPLE } from './svg';

function story_hero_gradient() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 94, true), subline(60, 320, '{{SUBTITLE}}', 40, 'muted', true), photo(60, 380, 960, 1100, 28, '{{PHOTO_LABEL}}'));
	s.push(`<rect x="60" y="${h - 300}" width="${w - 120}" height="160" rx="24" class="accent"/>`);
	s.push(`<text x="${w / 2}" y="${h - 210}" text-anchor="middle" font-family="Inter" font-size="46" fill="${WHITE}" font-weight="800">{{CTA}}</text>`);
	s.push(`<text x="${w / 2}" y="${h - 160}" text-anchor="middle" font-family="Inter" font-size="34" fill="${WHITE}">{{HANDLE}}</text>`);
	s.push(svgClose());
	return s.join('');
}

function story_countdown() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), photo(60, 340, 960, 980, 28, '{{COUNTDOWN_LABEL}}'), subline(60, 1400, '{{SUBTITLE}}', 42, 'ink'));
	s.push(svgClose());
	return s.join('');
}

function story_pricelist() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), `<rect x="60" y="280" width="420" height="8" rx="4" class="accent"/>`);
	const rows: Array<[string, string]> = [
		['{{ITEM_1}}', '{{PRICE_1}}'],
		['{{ITEM_2}}', '{{PRICE_2}}'],
		['{{ITEM_3}}', '{{PRICE_3}}'],
		['{{ITEM_4}}', '{{PRICE_4}}'],
	];
	let y = 360;
	rows.forEach(([name, price]) => {
		s.push(panel(60, y - 40, 960, 120));
		s.push(`<text x="100" y="${y + 30}" font-family="Inter" font-size="38" class="ink" font-weight="800">${name}</text>`);
		s.push(`<text x="${1080 - 120}" y="${y + 30}" text-anchor="end" font-family="Inter" font-size="36" fill="${PURPLE}" font-weight="800">${price}</text>`);
		y += 140;
	});
	s.push(svgClose());
	return s.join('');
}

function story_agenda() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), photo(60, 340, 960, 600, 24, '{{PHOTO_LABEL}}'));
	let y = 1000;
	['{{L1}}', '{{L2}}', '{{L3}}'].forEach((line) => {
		s.push(`<text x="60" y="${y}" font-family="Inter" font-size="42" class="ink" font-weight="800">${line}</text>`);
		y += 76;
	});
	s.push(svgClose());
	return s.join('');
}

function story_poll() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92, true), photo(60, 340, 960, 980, 24, '{{POLL_LABEL}}'), subline(60, 1400, '{{SUBTITLE}}', 40, 'muted', true));
	s.push(svgClose());
	return s.join('');
}

function story_before_after() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), photo(60, 340, 960, 540, 24, '{{BEFORE_LABEL}}'), photo(60, 920, 960, 540, 24, '{{AFTER_LABEL}}'));
	s.push(svgClose());
	return s.join('');
}

function story_link() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92, true), photo(60, 340, 960, 900, 28, '{{PHOTO_LABEL}}'));
	s.push(`<rect x="60" y="${h - 300}" width="${w - 120}" height="160" rx="24" class="accent"/>`);
	s.push(`<text x="${w / 2}" y="${h - 210}" text-anchor="middle" font-family="Inter" font-size="48" fill="${WHITE}" font-weight="800">{{CTA}}</text>`);
	s.push(`<text x="${w / 2}" y="${h - 160}" text-anchor="middle" font-family="Inter" font-size="34" fill="${WHITE}">{{SUBTEXT}}</text>`);
	s.push(svgClose());
	return s.join('');
}

function story_testimonial() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{QUOTE}}', 70, true), subline(60, 320, '{{AUTHOR}}', 40, 'muted', true), photo(60, 380, 960, 540, 24, '{{PHOTO_LABEL}}'));
	s.push(panel(60, 960, 960, 160));
	s.push(`<text x="100" y="1030" font-family="Inter" font-size="42" class="ink" font-weight="800">{{STAT_1}}</text>`);
	s.push(`<text x="180" y="1030" font-family="Inter" font-size="36" class="muted">{{STAT_1_LABEL}}</text>`);
	s.push(svgClose());
	return s.join('');
}

function story_promo_code() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 88, true), photo(60, 340, 960, 900, 28, '{{PHOTO_LABEL}}'), subline(60, 1300, '{{SUBTITLE}}', 48, 'muted', true));
	s.push(svgClose());
	return s.join('');
}

function story_steps() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), `<rect x="60" y="280" width="520" height="8" rx="4" class="accent"/>`);
	const steps = ['{{STEP_1}}', '{{STEP_2}}', '{{STEP_3}}'];
	let y = 360;
	steps.forEach((st, i) => {
		s.push(panel(60, y, 960, 160));
		s.push(`<text x="100" y="${y + 100}" font-family="Inter" font-size="48" class="ink" font-weight="800">${i + 1}. ${st}</text>`);
		y += 180;
	});
	s.push(svgClose());
	return s.join('');
}

function story_lineup() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92, true), photo(60, 340, 960, 540, 24, '{{POSTER_LABEL}}'));
	let y = 940;
	['{{ARTIST_1}}', '{{ARTIST_2}}', '{{ARTIST_3}}', '{{ARTIST_4}}'].forEach((name) => {
		s.push(`<text x="60" y="${y}" font-family="Inter" font-size="48" fill="${WHITE}" font-weight="800">${name}</text>`);
		y += 76;
	});
	s.push(svgClose());
	return s.join('');
}

function story_bts() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), photo(60, 340, 455, 600, 24, '{{PHOTO_1}}'), photo(565, 340, 455, 600, 24, '{{PHOTO_2}}'), photo(60, 960, 455, 520, 24, '{{PHOTO_3}}'), photo(565, 960, 455, 520, 24, '{{PHOTO_4}}'));
	s.push(svgClose());
	return s.join('');
}

function story_equipment_feature() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92, true), panel(60, 340, 960, 520, 24, false), subline(60, 900, '{{SUBTITLE}}', 48, 'muted', true));
	s.push(svgClose());
	return s.join('');
}

function story_reviews() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 84), `<rect x="60" y="280" width="640" height="8" rx="4" class="accent"/>`);
	let y = 360;
	['{{Q1}}', '{{Q2}}', '{{Q3}}'].forEach((q) => {
		s.push(panel(60, y, 960, 160));
		s.push(`<text x="100" y="${y + 100}" font-family="Inter" font-size="40" class="ink" font-weight="700">${q}</text>`);
		y += 180;
	});
	s.push(svgClose());
	return s.join('');
}

function story_collage_three_vertical() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), photo(60, 340, 960, 520, 24, '{{PHOTO_MAIN}}'), photo(60, 900, 455, 520, 24, '{{PHOTO_1}}'), photo(565, 900, 455, 520, 24, '{{PHOTO_2}}'));
	s.push(svgClose());
	return s.join('');
}

function story_announcement_big() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92, true), photo(60, 340, 960, 900, 24, '{{PHOTO_LABEL}}'), subline(60, 1300, '{{SUBTITLE}}', 48, 'muted', true));
	s.push(svgClose());
	return s.join('');
}

function story_schedule_week() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 88));
	const lines = ['{{L1}}', '{{L2}}', '{{L3}}', '{{L4}}', '{{L5}}', '{{L6}}', '{{L7}}'];
	let y = 340;
	lines.forEach((ln) => { s.push(`<text x="60" y="${y}" font-family="Inter" font-size="42" class="ink" font-weight="800">${ln}</text>`); y += 64; });
	s.push(svgClose());
	return s.join('');
}

function story_rebooking() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-grad"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92, true), photo(60, 340, 960, 900, 28, '{{PHOTO_LABEL}}'), subline(60, 1300, '{{SUBTITLE}}', 48, 'muted', true));
	s.push(svgClose());
	return s.join('');
}

function story_qr_link() {
	const w = 1080, h = 1920; const s: string[] = [svgOpen(w, h), `<rect width="${w}" height="${h}" class="bg-white"/>`, safeBox(w, h)];
	s.push(logoBadge(60, 60, 110), headline(60, 260, '{{TITLE}}', 92), panel(340, 520, 400, 400, 40), subline(320, 960, '{{SUBTITLE}}', 40, 'ink'));
	s.push(svgClose());
	return s.join('');
}

export const STORIES: Record<string, string> = {
	'01_story_hero_gradient.svg': story_hero_gradient(),
	'02_story_countdown.svg': story_countdown(),
	'03_story_pricelist.svg': story_pricelist(),
	'04_story_agenda.svg': story_agenda(),
	'05_story_poll.svg': story_poll(),
	'06_story_before_after.svg': story_before_after(),
	'07_story_link.svg': story_link(),
	'08_story_testimonial.svg': story_testimonial(),
	'09_story_promo_code.svg': story_promo_code(),
	'10_story_steps.svg': story_steps(),
	'11_story_lineup.svg': story_lineup(),
	'12_story_bts.svg': story_bts(),
	'13_story_equipment_feature.svg': story_equipment_feature(),
	'14_story_reviews.svg': story_reviews(),
	'15_story_collage_three.svg': story_collage_three_vertical(),
	'16_story_announcement_big.svg': story_announcement_big(),
	'17_story_schedule_week.svg': story_schedule_week(),
	'18_story_rebooking.svg': story_rebooking(),
	'19_story_qr_link.svg': story_qr_link(),
	'20_story_hero_white.svg': story_countdown().replace('class="bg-white"', 'class="bg-grad"'),
}; 