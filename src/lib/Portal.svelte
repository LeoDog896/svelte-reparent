<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	type Container = HTMLElement;

	// universal map to keep track of what portal a component wants to be in
	let components = new Map<Container, string>();

	// dirty tracker - a Map isn't reactive, so we need to coerce Svelte to re-render
	let dirty = writable(Symbol());

	export async function teleport(component: Container, key: string) {
		components.set(component, key);

		// trigger a re-render
		dirty.set(Symbol());
	}
</script>

<script lang="ts">
	export let key: string;
	export let component: Container;

	/*
		- component may be nil before mount
		- listen to dirty to force a re-render
	*/
	$: if (component && $dirty && components.get(component) == key) {
		// appendChild forces a move, not a copy - we can safely use this as the DOM
		// handles ownership of the node for us
		container.appendChild(component);
	}

	let container: HTMLDivElement;
</script>

<div style="display: contents;" bind:this={container} />
