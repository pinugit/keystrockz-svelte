<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from '../components/Cursor.svelte';

	let wordArray: string[] = [];

	const noOfLetterPerWordArray: number[] = [];

	onMount(async () => {
		const response = await fetch('/api/random-array/');
		wordArray = await response.json();
		console.log(wordArray);
		updateNoOfLetterPerWordArray();
	});

	const updateNoOfLetterPerWordArray = () => {
		wordArray.map((word) => {
			noOfLetterPerWordArray.push(word.length);
		});
	};
	const space = ' ';
</script>

<div class="page-container">
	<div class="typing-container">
		{#each wordArray as word, wordIndex}
			<div class="words">
				{#each word as letter, letterIndex}
					<div class={`letter-${wordIndex}-${letterIndex} due`}>{letter}</div>
				{/each}
				<div class={`letter-${wordIndex}-${word.length} space due`}>{space}</div>
			</div>
		{/each}
	</div>
</div>
<Cursor {noOfLetterPerWordArray} />

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
		overflow: scroll;
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
	/* these classes are for letters to set there colors based on the user typong */
	.due {
		color: #8c8c8c;
	}
</style>
