<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import RoundData from '../stores/RoundData';
	introd;

	let newRoundData: {
		totalCharacters: number;
		totalTimeInS: number;
		errors: number;
		correctCharacters: number;
	};
	let accuracy: number;
	let wpm: number;
	const dispatch = createEventDispatcher();

	const handleResetRound = () => {
		dispatch('reset');
	};
	//auto subescribe syntex
	$: newRoundData = $RoundData;
	onMount(() => {
		accuracy = (newRoundData.correctCharacters / newRoundData.totalCharacters) * 100;
		wpm =
			(newRoundData.totalCharacters - newRoundData.errors) / 5 / (newRoundData.totalTimeInS / 60);
		console.log(accuracy);
	});
</script>

<div style="display: flex; flex-direction:column; gap:20px">
	<h1>accuracy:{accuracy}</h1>
	<h1>wpm:{wpm}</h1>
	<button on:click={handleResetRound}>start another round</button>
</div>
