import { APP_TEMPLATES } from '../config/app';

export const POST_PRESETS: Record<string, Record<string, string>> = {
	'01_post_hero_white.svg': {
		TITLE: 'SOIRÉE PRIVÉE',
		SUBTITLE: 'Lumière • Son • Scène',
		CTA: 'Plus d\'infos en bio',
		HANDLE: APP_TEMPLATES.defaultHandles.instagram,
	},
	'02_post_hero_gradient.svg': {
		TITLE: 'ÉLÉGANCE & SON',
		SUBTITLE: 'Événementiel & location premium',
	},
	'03_post_promo_pack.svg': {
		TITLE: 'PACK LUMIÈRE PRO',
		PHOTO_LABEL: 'Photo du pack',
		PRICE_LABEL: 'À partir de',
		PRICE: '299€',
		PROMO: '-15% CE MOIS-CI',
	},
	'04_post_promo_big_discount.svg': {
		TITLE: '-25% LOCATION',
		SUBTITLE: 'Cette semaine uniquement',
		CODE: 'Code: NOVA25',
	},
	'05_post_catalog_2x2.svg': {
		TITLE: 'CATALOGUE',
		PRODUCT_PHOTO: 'Produit',
		PRODUCT_NAME: 'Nom du produit',
		PRODUCT_PRICE: 'Dès 39€/jour',
	},
	'06_post_catalog_3x3.svg': {
		TITLE: 'CATALOGUE EXPRESS',
		PRODUCT_PHOTO: 'Produit',
		PRODUCT_NAME: 'Nom du produit',
		PRODUCT_PRICE: 'Dès 29€/j',
	},
	'07_post_before_after_vertical.svg': {
		TITLE: 'AVANT / APRÈS',
		BEFORE_LABEL: 'AVANT',
		AFTER_LABEL: 'APRÈS',
	},
	'08_post_before_after_horizontal.svg': {
		TITLE: 'AVANT / APRÈS',
		BEFORE_LABEL: 'AVANT',
		AFTER_LABEL: 'APRÈS',
	},
	'09_post_testimonial_stats.svg': {
		QUOTE: '“Service impeccable.”',
		AUTHOR: '— Client entreprise',
		PHOTO_LABEL: 'Photo event',
		STAT_1_VALUE: '+2000',
		STAT_1_LABEL: 'Participants',
		STAT_2_VALUE: '24h',
		STAT_2_LABEL: 'Montage & démontage',
	},
	'10_post_lineup.svg': {
		TITLE: 'LINE-UP',
		ARTIST_1: 'DJ NOVA',
		ARTIST_2: 'LOLA • MATH',
		ARTIST_3: 'ORION B2B LUNA',
		ARTIST_4: 'GUEST TBA',
		POSTER_LABEL: 'Affiche',
	},
	'11_post_quote_gradient.svg': {
		QUOTE: '“La lumière crée l’ambiance.”',
		AUTHOR: APP_TEMPLATES.defaultTeam,
	},
	'12_post_agenda_month.svg': {
		TITLE: 'AGENDA SEPTEMBRE',
	},
	'13_post_tips_slide.svg': {
		TITLE: '3 CONSEILS ÉCLAIRAGE',
		TIP_1: 'Prévoir un DMX propre',
		TIP_2: 'Ajouter du backlight',
		TIP_3: 'Utiliser un peu de fumée',
	},
	'14_post_new_arrival.svg': {
		TITLE: 'NOUVEAUTÉ STOCK',
		PHOTO_LABEL: 'Photo produit',
		SUBTITLE: 'Disponible dès maintenant — Devis en DM',
	},
	'15_post_collage_three.svg': {
		TITLE: 'MOMENTS',
		PHOTO_MAIN: 'Grand',
		PHOTO_1: 'Petit 1',
		PHOTO_2: 'Petit 2',
	},
	'16_post_staff_intro.svg': {
		TITLE: 'NOTRE ÉQUIPE',
		PORTRAIT_LABEL: 'Portrait',
		NAME: 'Nom Prénom',
		ROLE: 'Rôle',
		BIO: '“Courte bio ou punchline.”',
	},
	'17_post_faq.svg': {
		TITLE: 'FAQ RAPIDE',
		Q1: 'Livrez-vous ?', A1: 'Oui, partout en IDF.',
		Q2: 'Assistance technique ?', A2: 'Oui, montage/démontage.',
		Q3: 'Devis ?', A3: 'Sous 24h, gratuit.',
	},
	'18_post_event_teaser.svg': {
		TITLE: 'SAMEDI 21 SEPT',
		SUBTITLE: 'Paris • 20h – 02h',
		PHOTO_LABEL: 'Visuel de l’événement',
	},
};

export const STORY_PRESETS: Record<string, Record<string, string>> = {
	'01_story_hero_gradient.svg': {
		TITLE: 'ÉLÉGANCE & SON',
		SUBTITLE: 'Location premium • devis rapide',
		PHOTO_LABEL: 'Photo plein écran',
		CTA: 'RÉSERVEZ VOTRE DATE',
		HANDLE: APP_TEMPLATES.defaultHandles.instagram,
	},
	'02_story_countdown.svg': {
		TITLE: 'J-7 AVANT LA SOIRÉE',
		COUNTDOWN_LABEL: 'Sticker COUNTDOWN ici',
		SUBTITLE: 'Vendredi 29 mars — Paris',
	},
	'03_story_pricelist.svg': {
		TITLE: 'LOCATION MATÉRIEL',
		ITEM_1: 'Pack Son 2x12” + table', PRICE_1: '99€/jour',
		ITEM_2: 'Pack Lumière 8x PAR + contrôleur', PRICE_2: '89€/jour',
		ITEM_3: 'Structure Truss 3x3', PRICE_3: '59€/jour',
		ITEM_4: 'Machine à fumée 900W', PRICE_4: '29€/jour',
	},
	'04_story_agenda.svg': {
		TITLE: 'CE WEEK-END',
		PHOTO_LABEL: 'Visuel principal',
		L1: 'Ven 20: Soirée Fluo — Paris 11e',
		L2: 'Sam 21: Mariage — Versailles',
		L3: 'Dim 22: Afterwork — Boulogne',
	},
	'05_story_poll.svg': {
		TITLE: 'QUEL STYLE ?',
		POLL_LABEL: 'Sticker POLL ici',
		SUBTITLE: 'Fluo, doré, ou minimal ?',
	},
	'06_story_before_after.svg': {
		TITLE: 'AVANT / APRÈS',
		BEFORE_LABEL: 'AVANT', AFTER_LABEL: 'APRÈS',
	},
	'07_story_link.svg': {
		TITLE: 'DEVIS EN 2 MIN',
		PHOTO_LABEL: 'Photo / texture',
		CTA: 'OUVRIR LE LIEN',
		SUBTEXT: 'bio / QR / URL',
	},
	'08_story_testimonial.svg': {
		QUOTE: '“Parfait du brief au démontage.”',
		AUTHOR: '— Client entreprise',
		PHOTO_LABEL: 'Photo événement',
		STAT_1: '+2500',
		STAT_1_LABEL: 'Lumen de puissance',
	},
	'09_story_promo_code.svg': {
		TITLE: '-20% CE WEEK-END',
		PHOTO_LABEL: 'Photo produit',
		SUBTITLE: 'Code : NOVA20',
	},
	'10_story_steps.svg': {
		TITLE: 'COMMENT RÉSERVER',
		STEP_1: 'Choisis ton pack',
		STEP_2: 'Donne la date & lieu',
		STEP_3: 'Reçois un devis en 24h',
	},
	'11_story_lineup.svg': {
		TITLE: 'LINE-UP',
		POSTER_LABEL: 'Affiche',
		ARTIST_1: 'DJ NOVA', ARTIST_2: 'LOLA • MATH', ARTIST_3: 'ORION B2B LUNA', ARTIST_4: 'GUEST TBA',
	},
	'12_story_bts.svg': {
		TITLE: 'BACKSTAGE',
		PHOTO_1: 'Montage', PHOTO_2: 'Régie', PHOTO_3: 'Lumière', PHOTO_4: 'Son',
	},
	'13_story_equipment_feature.svg': {
		TITLE: 'FOCUS MATÉRIEL',
		SUBTITLE: 'Nom du produit — 129€/jour',
	},
	'14_story_reviews.svg': {
		TITLE: 'ILS NOUS RECOMMANDENT',
		Q1: '“Super équipe, super son.”',
		Q2: '“Installation rapide et propre.”',
		Q3: '“Rendu lumineux incroyable !”',
	},
	'15_story_collage_three.svg': {
		TITLE: 'MOMENTS',
		PHOTO_MAIN: 'Grande', PHOTO_1: 'Petite 1', PHOTO_2: 'Petite 2',
	},
	'16_story_announcement_big.svg': {
		TITLE: 'GROSSE ANNONCE',
		PHOTO_LABEL: 'Visuel',
		SUBTITLE: 'Détails demain 18h',
	},
	'17_story_schedule_week.svg': {
		TITLE: 'PLANNING SEMAINE',
		L1: 'Lun: Montage - Levallois', L2: 'Mar: Réunion technique', L3: 'Mer: Location - Nanterre', L4: 'Jeu: Show - Paris 11e', L5: 'Ven: Show - Montreuil', L6: 'Sam: Mariage - Versailles', L7: 'Dim: Off',
	},
	'18_story_rebooking.svg': {
		TITLE: 'RÉSERVEZ VOTRE DATE',
		PHOTO_LABEL: 'Photo',
		SUBTITLE: 'Week-ends de mai: vite !',
	},
	'19_story_qr_link.svg': {
		TITLE: 'SCANNEZ POUR DEVIS',
		SUBTITLE: 'Placez votre QR code ici',
	},
	'20_story_hero_white.svg': {
		TITLE: 'ÉLÉGANCE & SON (ALT)',
		SUBTITLE: 'Location premium • devis rapide',
		HANDLE: APP_TEMPLATES.defaultHandles.instagram,
		CTA: 'RÉSERVEZ VOTRE DATE',
	},
}; 