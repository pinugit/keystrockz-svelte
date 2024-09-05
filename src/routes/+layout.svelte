<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<div class="pageContainer">
	<img src="/topLeftShape.svg" alt="shape" style="position: absolute; top:0; left:0" />
	<img src="/bottomLeftShape.svg" alt="shape" style="position:absolute; bottom:200px; left:0;" />
	<img src="/bottomShape.svg" alt="shape" style="position: absolute; bottom:0px; left:500px" />
	<img src="/topRightShape.svg" alt="shape" style="position: absolute;  right:0px" />
	<img
		src="/bottomRightShape.svg"
		alt="shape"
		style="position: absolute; bottom:100px; right:0px"
	/>
	<slot></slot>
</div>

<style>
	.pageContainer {
		height: 100vh;
		background: #141414;
		position: relative;
		padding: 0 80px;
	}
</style>
