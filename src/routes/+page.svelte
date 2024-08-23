<script lang="ts">
	import { onMount } from 'svelte';

	let wordArray: string[] = [];

	onMount(async () => {
		const response = await fetch('/api/random-array/');
		wordArray = await response.json();
		console.log(wordArray);
	});
</script>

<div class="page-container">
	<div class="typing-container">
		{#each wordArray as word, wordIndex}
			<div class="words">
				{#each word as letter, letterIndex}
					<div class={`letter-${wordIndex}-${letterIndex}`}>{letter}</div>
				{/each}
			</div>
		{/each}
	</div>
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
		overflow: scroll;
		scrollbar-width: none;
		font-size: 40px;
		font-family: 'jetbrains mono';
		display: flex;
		flex-wrap: wrap;
	}
	.words {
		display: flex;
		margin-left: 20px;
		margin-bottom: 22px;
		margin-top: 0;
	}
</style>
