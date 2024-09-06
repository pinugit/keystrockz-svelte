<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from '../components/Cursor.svelte';
	import RoundEndScreen from '../components/RoundEndScreen.svelte';
	import Navbar from '../components/Navbar.svelte';
	import RoundModes from '../components/RoundModes.svelte';
	import { fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';

	let wordArray: string[] = [];
	const noOfLetterPerWordArray: number[] = [];
	let toggleInputFocusOnChildren: () => void;
	let isRoundEnd = false;
	let isRoundStarted = false;
	const space = ' ';

	$: console.log(isRoundEnd);

	onMount(async () => {
		const response = await fetch('/api/random-array/?limit=40');
		wordArray = await response.json();
		updateNoOfLetterPerWordArray();
		// let animate = true;
	});

	const updateNoOfLetterPerWordArray = () => {
		wordArray.map((word) => {
			noOfLetterPerWordArray.push(word.length);
		});
	};

	const handleInputFocus = () => {
		if (toggleInputFocusOnChildren) {
			toggleInputFocusOnChildren();
		}
	};

	const handleRoundEnd = (event: { detail: boolean }) => {
		setTimeout(() => {
			isRoundEnd = event.detail;
		}, 100);
	};

	const handleRoundStart = (event: { detail: boolean }) => {
		isRoundStarted = event.detail;
	};
</script>

{#if !isRoundStarted || isRoundEnd}
	<Navbar />
{/if}
<div class="page-container">
	{#if isRoundEnd}
		<RoundEndScreen
			on:reset={() => {
				isRoundEnd = false;
				isRoundStarted = false;
			}}
		/>
	{/if}
	{#if !isRoundStarted}
		<RoundModes />
	{/if}
	{#if isRoundStarted && !isRoundEnd}
		<div style="height: 40px;">timer</div>
	{/if}

	{#if !isRoundEnd}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="typing-container"
			on:click={handleInputFocus}
			role="button"
			tabindex="0"
			aria-label="click here to start typing"
		>
			{#each wordArray as word, wordIndex}
				<div
					class="words"
					transition:fly={{
						y: 70,
						delay: wordIndex * 40,
						easing: backOut
					}}
				>
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
			on:RoundStarted={handleRoundStart}
		/>
	{/if}
</div>

<style>
	.page-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
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
		font-family: 'Space Grotesk';
		display: flex;
		flex-wrap: wrap;
		margin-top: 8px;
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
