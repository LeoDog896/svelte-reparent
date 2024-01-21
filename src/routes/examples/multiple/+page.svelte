<script lang="ts">
	import { onMount } from 'svelte';
	import { Portal, Limbo, teleport } from '$lib';

	let component: HTMLElement;
    let component2: HTMLElement;

	let hasLimbo = true;

	function send(label: string) {
		return () => teleport(component, label);
	}

    function send2(label: string) {
        return () => teleport(component2, label);
    }

	onMount(send('a'));
</script>

<main>
	{#if hasLimbo}
		<Limbo bind:component>
			<input placeholder="Enter unkept state" />
		</Limbo>
        <Limbo bind:component={component2}>
            <input placeholder="Enter unkept state 2" />
        </Limbo>
	{/if}
	<div class="container">
		<h1>Container A</h1>
		<Portal key="a" {component} />
        <Portal key="a" component={component2} />
		<button on:click={send('a')}>Move Component Here</button>
        <button on:click={send2('a')}>Move Component 2 Here</button>
	</div>
	<div class="container">
		<h1>Container B</h1>
		<Portal key="b" {component} />
        <Portal key="b" component={component2} />
		<button on:click={send('b')}>Move Component Here</button>
        <button on:click={send2('b')}>Move Component 2 Here</button>
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
