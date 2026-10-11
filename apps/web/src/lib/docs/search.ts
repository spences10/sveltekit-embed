export interface SearchItem {
	id: string;
	title: string;
	/** One line shown under the title */
	detail?: string;
	/** Extra terms that match but aren't shown */
	keywords?: string[];
}

/** Characters of `term` appear in `text` in order, e.g. `ytb` in `youtube` */
function is_subsequence(term: string, text: string) {
	let index = 0;
	for (const character of text) {
		if (character === term[index]) index++;
		if (index === term.length) return true;
	}
	return false;
}

function score_term(term: string, item: SearchItem) {
	const title = item.title.toLowerCase();
	if (title === term) return 120;
	if (title.startsWith(term)) return 100;
	if (title.includes(term)) return 70;

	let best = 0;
	for (const keyword of item.keywords ?? []) {
		const value = keyword.toLowerCase();
		if (value.startsWith(term)) best = Math.max(best, 50);
		else if (value.includes(term)) best = Math.max(best, 35);
	}
	if (best) return best;

	if (item.detail?.toLowerCase().includes(term)) return 20;
	// Typos and abbreviations, only worth trying past a couple of letters
	if (term.length > 2 && is_subsequence(term, title)) return 10;
	return 0;
}

/** 0 when the item doesn't match. Every word in the query has to. */
export function score(query: string, item: SearchItem) {
	const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
	let total = 0;
	for (const term of terms) {
		const term_score = score_term(term, item);
		if (!term_score) return 0;
		total += term_score;
	}
	return total;
}

/** Matching items, best first. An empty query returns them all as given. */
export function search<Item extends SearchItem>(
	query: string,
	items: Item[],
) {
	if (!query.trim()) return items;
	return items
		.map((item) => ({ item, score: score(query, item) }))
		.filter((result) => result.score > 0)
		.sort((a, b) => b.score - a.score)
		.map((result) => result.item);
}
