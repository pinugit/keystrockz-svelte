import { writable } from 'svelte/store';

const RoundData = writable({
	totalCharacters: 0,
	totalTimeInS: 0,
	errors: 0,
	correctCharacters: 0
});

export default RoundData;
