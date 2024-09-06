<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	let testMode: 'Time' | 'Quotes' | 'Word' = 'Time';
	let time: number = 30;
	let noOfWords: number = 15;
	let currentParagraph: string[];
	const dispatch = createEventDispatcher();
	const getRandomWordArray = async () => {
		const response = await fetch(`/api/random-array/?limit=${noOfWords}`);
		const newWordArray = await response.json();
		currentParagraph = newWordArray;
	};

	const getRandomQuotes = async () => {
		const response = await fetch('https://quotes-api-self.vercel.app/quote');
		const newRandomQuote = await response.json();
		currentParagraph = newRandomQuote.quote;
	};

	$: dispatch('currentParagraphChange', currentParagraph);
	const isTestMode = (mode: string) => (testMode === mode ? true : false);

	onMount(getRandomWordArray);
</script>

<div class="modes-selector">
	<div class="left-tag-container">
		<button class="button">{testMode}</button>
		{#if isTestMode('Time')}
			<button class="button">{time} Seconds</button>
		{/if}
		{#if isTestMode('Word')}
			<button class="button">{noOfWords} Words</button>
		{/if}
	</div>
	<button class="button primary"> Mode</button>
</div>

<style>
	.modes-selector {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left-tag-container {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.button {
		padding: 4px 16px;
		border: #f0f0f0 solid 2px;
		border-radius: 30px;
		background: #141414;
		color: #f0f0f0;
		font-family: 'Space Grotesk';
		font-size: 18px;
	}
	.primary {
		background: #7129ba;
		border: none;
	}
	.primary:hover {
		background: #441970;
	}
</style>
