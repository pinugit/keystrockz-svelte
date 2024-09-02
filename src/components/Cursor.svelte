<script>
	import { afterUpdate, onMount } from 'svelte';

	let x = 0;
	let y = 0;
	let initialY = 0;
	let currentWordIndex = 0;
	let currentLetterIndex = 0;
	let isFirstLinePassed = false;
	let inputValue = '';
	export let noOfLetterPerWordArray;

	const setCursorPosition = () => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		const currentElementRect = currentElement[0].getBoundingClientRect();
		if (y > initialY) {
			x = currentElementRect.left;
		} else if (currentElementRect) {
			y = currentElementRect.top;
			x = currentElementRect.left;
		}
	};

	afterUpdate(() => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		currentElement[0].scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});

	const handleTyping = (event) => {
		const key = event.key;
		console.log(key);

		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		const currentLetter = currentElement[0].innerHTML;

		if (key === 'Backspace') {
			if (currentLetterIndex != 0 && currentWordIndex != 0) {
				console.log('entered ');

				if (currentLetterIndex === 0) {
					console.log('minising word');

					currentWordIndex -= 1;
					currentLetterIndex = noOfLetterPerWordArray[currentWordIndex - 1];
				} else {
					console.log('minusing letter');

					currentLetterIndex -= 1;
				}
			}
		} else if (currentLetterIndex === noOfLetterPerWordArray[currentWordIndex]) {
			currentWordIndex += 1;
			currentLetterIndex = 0;
		} else {
			currentLetterIndex += 1;
		}

		console.log(currentWordIndex, currentLetterIndex);

		setCursorPosition();

		inputValue = '';
	};

	onMount(() => {
		setTimeout(() => {
			setCursorPosition();
			initialY = y;
		}, 200);
	});
</script>

{#if y > 10}
	<div class="cursor" style="top:{y}px; left:{x}px"></div>
{/if}
<input
	type="text"
	id="myInput"
	style="position: absolute; top: 200px;"
	bind:value={inputValue}
	on:keydown={handleTyping}
/>

<style>
	.cursor {
		position: absolute;
		height: 42px;
		width: 2px;
		background: #f0f0f0;
		transition: all 100ms ease-in-out;
		margin-top: 5px;
	}
</style>
