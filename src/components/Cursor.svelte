<script lang="ts">
	import { afterUpdate, createEventDispatcher, onMount } from 'svelte';
	import RoundData from '../stores/RoundData';

	let x = 0;
	let y = 0;
	let initialY = 0;
	let currentWordIndex = 0;
	let currentLetterIndex = 0;
	let inputValue = '';
	let inputRef: HTMLInputElement;
	let isRoundNotEnd = true;
	let errors = 0;
	let correctCharacters = 0;
	let timesRan = 0;
	let startTime: Date;
	const dispatcher = createEventDispatcher();
	export let noOfLetterPerWordArray;
	//if the curentLetterIndex is great than 0 means round started
	$: if (currentLetterIndex >= 1 && timesRan === 0) {
		dispatcher('RoundStarted', true);
		timesRan += 1;
		startTime = new Date();
	}

	export const toggleInputFocus = () => {
		inputRef.focus();
	};
	const setCursorPosition = (key: string = '') => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		const currentElementRect = currentElement[0].getBoundingClientRect();
		if (key === 'Backspace') {
			y = currentElementRect.top;
			x = currentElementRect.left;
			return;
		}
		if (y > initialY) {
			x = currentElementRect.left;
		} else {
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
					errors += 1;
				} else {
					currentElement[0].classList.remove('due');
					currentElement[0].classList.add('correct-word');
					correctCharacters += 1;
				}
			}
		}
	};

	const handleTyping = (event: { key: string }) => {
		const key = event.key;
		inputValue = '';

		//this is when the round ends
		if (
			currentWordIndex + 1 === noOfLetterPerWordArray.length &&
			currentLetterIndex + 1 > noOfLetterPerWordArray[currentWordIndex]
		) {
			dispatcher('roundEnd', true);
			inputRef.blur();
			isRoundNotEnd = false;

			let endTime: Date = new Date();
			const totalTimeInMs = endTime.getTime() - startTime.getTime();
			const totalTimeInS = totalTimeInMs / 1000;

			const totalCharacters = errors + correctCharacters;
			RoundData.set({
				totalCharacters: totalCharacters,
				totalTimeInS: totalTimeInS,
				errors: errors,
				correctCharacters: correctCharacters
			});
			return;
		}

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

		setCursorPosition(key);
	};

	onMount(() => {
		setTimeout(() => {
			setCursorPosition();
			initialY = y;
		}, 200);
		inputRef.focus();
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

{#if isRoundNotEnd}
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
{/if}

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
