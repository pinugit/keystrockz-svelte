<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from '../components/Cursor.svelte';
	import RoundEndScreen from '../components/RoundEndScreen.svelte';

	let wordArray: string[] = [];
	const noOfLetterPerWordArray: number[] = [];
	let toggleInputFocusOnChildren: () => void;
	let isRoundEnd = false;
	const space = ' ';

	$: console.log(isRoundEnd);

	onMount(async () => {
		const response = await fetch('/api/random-array/?limit=5');
		wordArray = await response.json();
		console.log(wordArray);
		updateNoOfLetterPerWordArray();
	});

	const updateNoOfLetterPerWordArray = () => {
		wordArray.map((word) => {
			noOfLetterPerWordArray.push(word.length);
		});
	};

	const handleInputFoucs = () => {
		if (toggleInputFocusOnChildren) {
			toggleInputFocusOnChildren();
		}
	};

	const handleRoundEnd = (event: { detail: boolean }) => {
		setTimeout(() => {
			isRoundEnd = event.detail;
		}, 300);
	};
</script>

<div class="page-container">
	{#if isRoundEnd}
		<RoundEndScreen />
		<h1 style="color: white;">hello world</h1>
	{/if}

	{#if !isRoundEnd}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="typing-container"
			on:click={handleInputFoucs}
			role="button"
			tabindex="0"
			aria-label="click here to start typing"
		>
			{#each wordArray as word, wordIndex}
				<div class="words">
					{#each word as letter, letterIndex}
						<div class={`letter-${wordIndex}-${letterIndex} due`}>{letter}</div>
					{/each}
					<div class={`letter-${wordIndex}-${word.length} space due`}>{space}</div>
				</div>
			{/each}
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
			<div class="dummy-word"></div>
		</div>
		<Cursor
			{noOfLetterPerWordArray}
			bind:toggleInputFocus={toggleInputFocusOnChildren}
			on:roundEnd={handleRoundEnd}
		/>
	{/if}
</div>

<style>
	.page-container {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #f0f0f0;
	}
	.typing-container {
		height: 200px;
		width: 100%;
		overflow: hidden;
		scrollbar-width: none;
		font-size: 40px;
		font-family: 'jetbrains mono';
		display: flex;
		flex-wrap: wrap;
	}
	.words {
		display: flex;
		margin-bottom: 22px;
		margin-top: 0;
	}
	.space {
		width: 20px;
	}
	.dummy-word {
		width: 10000px;
		height: 20px;
	}
	/* these classes are for letters to set there colors based on the user typong */
	.due {
		color: #8c8c8c;
	}
</style>
