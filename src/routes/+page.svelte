<script>
	import { onMount } from "svelte";
	import Limbo from "$lib/Limbo.svelte";
	import Portal, { teleport } from "$lib/Portal.svelte"

	let component;

	function send(label: string) {
		return () => {
			teleport(label)
		}
	}

	onMount(() => {
		teleport("a")
	})
</script>

<main>
	<Limbo bind:component={component}>
		<input placeholder="Enter unkept state">
	</Limbo>
	<div class="container">
		<h1>Container A</h1>
		<Portal key="a" {component} />
		<button on:click={send("a")}>Move Component Here</button>
	</div>
	<div class="container">
		<h1>Container B</h1>
		<Portal key="b" {component} />
		<button on:click={send("b")}>Move Component Here</button>
	</div>
</main>

<style>
	.container {
		border: 1px solid black;
		margin: 1rem;
		padding: 1rem;
	}
</style>
