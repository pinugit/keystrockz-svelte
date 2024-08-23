import { json } from "@sveltejs/kit";
import { words } from "$lib/words.js";

export function GET({ url }) {
	const limit = Number(url.searchParams.get("limit")) || 30;
	const newList = [];
	for (let i = 0; i < limit; i++) {
		const randomIndex = Math.floor(Math.random() * words.length);
		newList.push(words[randomIndex]);
	}
	return json(newList);
}
