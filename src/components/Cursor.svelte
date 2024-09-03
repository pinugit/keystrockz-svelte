<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';

	let x = 0;
	let y = 0;
	let initialY = 0;
	let currentWordIndex = 0;
	let currentLetterIndex = 0;
	let inputValue = '';
	let inputRef: HTMLInputElement;
	export let noOfLetterPerWordArray;

	export const toggleInputFocus = () => {
		inputRef.focus();
	};
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

	const setLetterColorState = (key: string) => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		if (currentElement) {
			const currentLetter = currentElement[0].innerHTML;
			// change the letter state
			if (currentLetter != ' ') {
				if (key != currentLetter) {
					currentElement[0].classList.remove('due');
					currentElement[0].classList.add('incorrect-word');
				} else {
					currentElement[0].classList.remove('due');
					currentElement[0].classList.add('correct-word');
				}
			}
		}
	};

	const handleTyping = (event: { key: string }) => {
		const key = event.key;
		inputValue = '';
		console.log(key);

		//move the curor position
		if (key === 'Shift' || key === 'Control' || key === 'Alt') {
			//if these keys are pressed skip it all together
			return;
		} else if (key === 'Backspace') {
			if (currentWordIndex > 0 || currentLetterIndex > 0) {
				if (currentLetterIndex === 0) {
					currentWordIndex -= 1;
					currentLetterIndex = noOfLetterPerWordArray[currentWordIndex];
				} else {
					currentLetterIndex -= 1;
				}

				//handling the backspace differently for changing the color of the letter
				const currentElement = document.getElementsByClassName(
					`letter-${currentWordIndex}-${currentLetterIndex}`
				);

				currentElement[0].classList.remove('correct-word', 'incorrect-word');
				currentElement[0].classList.add('due');
			}
		} else if (currentLetterIndex === noOfLetterPerWordArray[currentWordIndex]) {
			setLetterColorState(key);
			currentWordIndex += 1;
			currentLetterIndex = 0;
		} else {
			setLetterColorState(key);
			currentLetterIndex += 1;
		}

		setCursorPosition();
	};

	onMount(() => {
		setTimeout(() => {
			setCursorPosition();
			initialY = y;
		}, 200);
	});

	afterUpdate(() => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		currentElement[0].scrollIntoView({
			behavior: 'smooth',
			block: 'center'
		});
	});
</script>

{#if y > 10}
	<div class="cursor" style="top:{y}px; left:{x}px"></div>
{/if}
<input
	type="text"
	bind:this={inputRef}
	style="position: absolute; top: -2000px; left: -1000px;"
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
