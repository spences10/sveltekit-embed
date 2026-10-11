import { describe, expect, it } from 'vite-plus/test';
import { score, search, type SearchItem } from './search.js';

const items: SearchItem[] = [
	{
		id: 'YouTube',
		title: 'YouTube',
		detail: 'A YouTube video or playlist, without cookies.',
		keywords: ['video', 'yt'],
	},
	{
		id: 'Spotify',
		title: 'Spotify',
		detail: 'A Spotify show, episode, album, playlist or track.',
		keywords: ['music', 'podcast'],
	},
	{
		id: 'Buzzsprout',
		title: 'Buzzsprout',
		detail: 'A Buzzsprout podcast episode player.',
		keywords: ['podcast'],
	},
	{ id: 'Tweet', title: 'Tweet', keywords: ['twitter', 'x'] },
];

const titles = (query: string) =>
	search(query, items).map((item) => item.title);

describe('search', () => {
	it('returns everything in order for an empty query', () => {
		expect(search('', items)).toBe(items);
		expect(search('   ', items)).toBe(items);
	});

	it('matches titles whatever the case', () => {
		expect(titles('YOUTUBE')).toEqual(['YouTube']);
	});

	it('matches keywords that are not in the title', () => {
		expect(titles('twitter')).toEqual(['Tweet']);
		expect(titles('podcast')).toEqual(['Spotify', 'Buzzsprout']);
	});

	it('ranks a title match above a description match', () => {
		// Both mention playlists, only one is called Spotify
		expect(titles('spot')[0]).toBe('Spotify');
		expect(titles('playlist')).toEqual(['YouTube', 'Spotify']);
		expect(score('you', items[0])).toBeGreaterThan(
			score('playlist', items[0]),
		);
	});

	it('needs every word to match', () => {
		expect(titles('podcast music')).toEqual(['Spotify']);
		expect(titles('podcast nope')).toEqual([]);
	});

	it('forgives skipped letters in a title', () => {
		expect(titles('ytb')).toEqual(['YouTube']);
		expect(titles('bzsp')).toEqual(['Buzzsprout']);
	});

	it('returns nothing when nothing matches', () => {
		expect(titles('zzz')).toEqual([]);
	});
});
