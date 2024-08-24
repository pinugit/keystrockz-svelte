<script>
	let x = 100;
	let y = 247;
	let currentWordIndex = 0;
	let currentLetterIndex = 0;
	export let noOfLetterPerWordArray;

	$: console.log(currentWordIndex, currentLetterIndex);
	$: console.log(noOfLetterPerWordArray);

	let inputValue = '';

	const setCursorPosition = () => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		const currentElementRect = currentElement[0].getBoundingClientRect();
		if (currentElementRect) {
			y = currentElementRect.top;
			x = currentElementRect.left;
		}
	};
	const handleTyping = () => {
		const currentElement = document.getElementsByClassName(
			`letter-${currentWordIndex}-${currentLetterIndex}`
		);
		const currentLetter = currentElement[0].innerHTML;
		console.log(currentLetter);

		if (currentLetter === inputValue) {
			if (currentLetterIndex + 1 === noOfLetterPerWordArray[currentWordIndex]) {
				currentWordIndex += 1;
				currentLetterIndex = 0;
			} else {
				currentLetterIndex += 1;
			}
			setCursorPosition();
		}
		inputValue = '';
	};
</script>

<div class="cursor" style="top:{y}px; left:{x}px"></div>
<input type="text" bind:value={inputValue} on:input={handleTyping} />

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
