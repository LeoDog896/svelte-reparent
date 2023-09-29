<script lang="ts">
	import { onMount } from 'svelte';
	import { Portal, Limbo, teleport } from '$lib';

	let component: HTMLElement;
	let hasLimbo = true;

	function send(label: string) {
		return () => teleport(component, label);
	}

	onMount(send('a'));
</script>

<main>
	{#if hasLimbo}
		<Limbo bind:component>
			<input placeholder="Enter unkept state" />
		</Limbo>
	{/if}
	<div class="container">
		<h1>Container A</h1>
		<Portal key="a" {component} />
		<button on:click={send('a')}>Move Component Here</button>
	</div>
	<div class="container">
		<h1>Container B</h1>
		<Portal key="b" {component} />
		<button on:click={send('b')}>Move Component Here</button>
	</div>

	<p>Have Limbo (original container):</p>
	<input type="checkbox" bind:checked={hasLimbo} />
</main>

<style>
	.container {
		border: 1px solid black;
		margin: 1rem;
		padding: 1rem;
	}
</style>
