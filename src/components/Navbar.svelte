<script>
	import Logo from './logo.svelte';
</script>

<div class="navbar"></div>

<style>
	.navbar {
		height: 80px;
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		/* From https://css.glass */
		background: rgba(54, 50, 50, 0.11);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(9.4px);
		-webkit-backdrop-filter: blur(9.4px);
		border: 1px solid rgba(54, 50, 50, 0.69);
	}
</style>
