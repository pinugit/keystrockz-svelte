<script>
	import { fly } from 'svelte/transition';
</script>

<div class="navbar" transition:fly={{ y: -200, duration: 1000 }}>
	<a href="/" style="padding-top: 10px;">
		<img src="/logo.png" alt="keystrockz logo" width="120px" />
	</a>
	<a href="/login" class="login-button">login or Register</a>
</div>

<style>
	.navbar {
		height: 80px;
		width: 100%;
		padding: 0 80px;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		/* From https://css.glass */
		background: rgba(60, 58, 60, 0.06);
		border-radius: 10px;
		backdrop-filter: blur(13.5px);
		-webkit-backdrop-filter: blur(13.5px);
		border-bottom: 1px solid rgba(60, 58, 60, 0.3);
	}
</style>
