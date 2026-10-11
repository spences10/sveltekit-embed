// Renders the link-preview card for every page to static/og/*.png.
// Run it again (`pnpm run share-cards`) when a component, its
// description or the look of the site changes.
import { Resvg } from '@resvg/resvg-js';
import {
	mkdirSync,
	mkdtempSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { site } from '../src/lib/config.ts';
import {
	categories,
	components,
	slug_of,
} from '../src/lib/docs/components.ts';

const OUTPUT_DIR = new URL('../static/og/', import.meta.url);
const { width: WIDTH, height: HEIGHT } = site.share_card;

// The light theme, as in src/app.css and twinkleplop.css
const PAPER = '#fbfbfe';
const SURFACE = '#f0f1f9';
const RULE = '#dcdeee';
const INK = '#15172b';
const MUTED = '#565a78';
const ULTRAMARINE = '#3340e8';
const MARIGOLD = '#ffb627';
const CODE = {
	punctuation: '#4a4e6e',
	tag: '#3340e8',
	attribute: '#0a6c9c',
	string: '#0b7a55',
	keyword: '#3340e8',
};

/**
 * Unpacks a WOFF file to the TrueType inside it. resvg only reads
 * TrueType and OpenType, and fontsource ships neither. WOFF is the
 * same tables, each zlib compressed, behind a different header.
 */
function woff_to_ttf(woff: Buffer) {
	const table_count = woff.readUInt16BE(12);
	const tables = Array.from({ length: table_count }, (_, index) => {
		const entry = 44 + index * 20;
		const offset = woff.readUInt32BE(entry + 4);
		const compressed_length = woff.readUInt32BE(entry + 8);
		const length = woff.readUInt32BE(entry + 12);
		const data = woff.subarray(offset, offset + compressed_length);
		return {
			tag: woff.subarray(entry, entry + 4),
			checksum: woff.readUInt32BE(entry + 16),
			length,
			data: compressed_length < length ? inflateSync(data) : data,
		};
	});

	const entry_selector = Math.floor(Math.log2(table_count));
	const search_range = 2 ** entry_selector * 16;
	const header = Buffer.alloc(12 + table_count * 16);
	woff.copy(header, 0, 4, 8); // the font's flavour
	header.writeUInt16BE(table_count, 4);
	header.writeUInt16BE(search_range, 6);
	header.writeUInt16BE(entry_selector, 8);
	header.writeUInt16BE(table_count * 16 - search_range, 10);

	const bodies: Buffer[] = [];
	let offset = header.length;
	tables.forEach((table, index) => {
		const record = 12 + index * 16;
		table.tag.copy(header, record);
		header.writeUInt32BE(table.checksum, record + 4);
		header.writeUInt32BE(offset, record + 8);
		header.writeUInt32BE(table.length, record + 12);
		// Tables start on four byte boundaries
		const padded = Buffer.alloc(Math.ceil(table.length / 4) * 4);
		table.data.copy(padded);
		bodies.push(padded);
		offset += padded.length;
	});

	return Buffer.concat([header, ...bodies]);
}

// The site's own fonts, so cards render the same on any machine.
// resvg doesn't apply variable font weights, so these are the static
// cuts of the families the site loads as variable fonts
const require = createRequire(import.meta.url);
// resvg's native build loads fonts from disk, not from memory
const font_dir = mkdtempSync(join(tmpdir(), 'share-card-fonts-'));
const FONT_FILES = [
	'bricolage-grotesque/files/bricolage-grotesque-latin-700-normal.woff',
	'bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff',
	'atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-400-normal.woff',
	'jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff',
].map((file, index) => {
	const path = join(font_dir, `${index}.ttf`);
	writeFileSync(
		path,
		woff_to_ttf(readFileSync(require.resolve(`@fontsource/${file}`))),
	);
	return path;
});
// The name the static cut gives itself, whatever its weight
const DISPLAY = 'Bricolage Grotesque 96pt ExtraBold';
const SANS = 'Atkinson Hyperlegible Next';
const MONO = 'JetBrains Mono';

const escape = (text: string) =>
	text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');

/** Greedy wrap. SVG has no text layout, so lines are split by length */
function wrap(text: string, max_chars: number) {
	const lines: string[] = [];
	for (const word of text.split(' ')) {
		const line = lines.at(-1);
		if (line !== undefined && `${line} ${word}`.length <= max_chars) {
			lines[lines.length - 1] = `${line} ${word}`;
		} else {
			lines.push(word);
		}
	}
	return lines;
}

type Token = [colour: string, text: string];

interface Card {
	file: string;
	/** Small line above the title */
	context: string;
	title: string[];
	description: string;
	code: Token[];
}

// The stage from the site: an ink frame on a marigold offset
const FRAME = { x: 56, y: 48, width: 1068, height: 514, offset: 16 };
const PAD = 56;
const LEFT = FRAME.x + PAD;
const DOMAIN = new URL(site.url).host;

function render(card: Card) {
	const title_size = card.title.length > 1 ? 84 : 116;
	const title_y = FRAME.y + 150 + title_size * 0.78;
	const description_y =
		title_y + (card.title.length - 1) * title_size * 0.98 + 66;

	const code_size = 26;
	const code_text = card.code.map(([, text]) => text).join('');
	const chip_width = code_text.length * code_size * 0.6 + 48;
	const chip_y = FRAME.y + FRAME.height - PAD - 62;

	const dots = `<pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="${RULE}"/></pattern>`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>${dots}</defs>
  <rect width="100%" height="100%" fill="${PAPER}"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>
  <rect x="${FRAME.x + FRAME.offset}" y="${FRAME.y + FRAME.offset}" width="${FRAME.width}" height="${FRAME.height}" rx="22" fill="${MARIGOLD}"/>
  <rect x="${FRAME.x}" y="${FRAME.y}" width="${FRAME.width}" height="${FRAME.height}" rx="22" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>

  <g transform="translate(${LEFT} ${FRAME.y + PAD - 6}) scale(1.5)">
    <rect x="7" y="7" width="24" height="24" rx="5" fill="${MARIGOLD}"/>
    <rect x="1" y="1" width="24" height="24" rx="5" fill="${ULTRAMARINE}"/>
    <path d="M10 7.5v11l9-5.5z" fill="#fff"/>
  </g>
  <text x="${LEFT + 66}" y="${FRAME.y + PAD + 28}" font-family="${DISPLAY}" font-size="32" font-weight="700" fill="${INK}">${site.package}</text>
  <text x="${FRAME.x + FRAME.width - PAD}" y="${FRAME.y + PAD + 26}" font-family="${SANS}" font-size="26" fill="${MUTED}" text-anchor="end">${escape(card.context)}</text>

  <g font-family="${DISPLAY}" font-size="${title_size}" font-weight="800" fill="${INK}" letter-spacing="-2">
    ${card.title.map((line, index) => `<text x="${LEFT - 4}" y="${title_y + index * title_size * 0.98}">${escape(line)}</text>`).join('')}
  </g>
  <g font-family="${SANS}" font-size="32" fill="${MUTED}">
    ${wrap(card.description, 60)
			.map(
				(line, index) =>
					`<text x="${LEFT}" y="${description_y + index * 44}">${escape(line)}</text>`,
			)
			.join('')}
  </g>

  <rect x="${LEFT}" y="${chip_y}" width="${chip_width}" height="62" rx="10" fill="${SURFACE}" stroke="${RULE}" stroke-width="2"/>
  <text x="${LEFT + 24}" y="${chip_y + 40}" font-family="${MONO}" font-size="${code_size}" xml:space="preserve">${card.code.map(([colour, text]) => `<tspan fill="${colour}">${escape(text)}</tspan>`).join('')}</text>
  <text x="${FRAME.x + FRAME.width - PAD}" y="${chip_y + 40}" font-family="${SANS}" font-size="24" fill="${MUTED}" text-anchor="end">${DOMAIN}</text>
</svg>`;
}

const cards: Card[] = [
	{
		file: 'home',
		context: `${components.length} components`,
		title: ['Embed media in', 'your Svelte apps.'],
		// One line: the two line title leaves no room for a second
		description: 'Components for videos, podcasts, posts and pens.',
		code: [
			[CODE.punctuation, '$ '],
			[INK, `pnpm add -D ${site.package}`],
		],
	},
	{
		file: 'lazy-loading',
		context: 'Guide',
		title: ['Lazy loading'],
		description:
			'How embeds load, how to load one straight away, and the in_view attachment for your own markup.',
		code: [
			[CODE.punctuation, '<'],
			[CODE.tag, 'div'],
			[CODE.punctuation, ' {'],
			[CODE.keyword, '@attach'],
			[INK, ' in_view(…)'],
			[CODE.punctuation, '}>'],
		],
	},
	...components.map((component): Card => {
		// The prop you have to give it: the required one, or the first
		const prop =
			component.props.find((prop) => prop.required) ??
			component.props[0];
		return {
			file: slug_of(component.name),
			context: categories.find(({ id }) => id === component.category)!
				.label,
			title: [component.name],
			description: component.description,
			code: [
				[CODE.punctuation, '<'],
				[CODE.tag, component.name],
				[CODE.attribute, ` ${prop.name}`],
				[CODE.punctuation, '='],
				[CODE.string, '"…"'],
				[CODE.punctuation, ' />'],
			],
		};
	}),
];

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const card of cards) {
	const png = new Resvg(render(card), {
		fitTo: { mode: 'original' },
		font: { fontFiles: FONT_FILES, loadSystemFonts: false },
	})
		.render()
		.asPng();

	writeFileSync(new URL(`${card.file}.png`, OUTPUT_DIR), png);
}

rmSync(font_dir, { recursive: true });

console.log(`Generated ${cards.length} share cards in static/og`);
