<script context="module" lang="ts">
	import { writable } from 'svelte/store';

	type Container = HTMLElement;
	type Key = string | number | symbol;

	/**
	 * Universal map to keep track of what portal a component wants to be in,
	 * as well as its original limbo owner.
	 *
	 * @internal
	 * DON'T MODIFY EXTERNALLY!
	 * Doing so is **undefined behavior**.
	 */
	export let _components = new Map<
		Container,
		{
			limbo?: HTMLElement;
			key?: Key;
		}
	>();

	// dirty tracker - a Map isn't reactive, so we need to coerce Svelte to re-render
	let dirty = writable(Symbol());

	export async function teleport(component: Container, key: Key) {
		_components.set(component, { ..._components.get(component), key });

		// trigger a re-render
		dirty.set(Symbol());
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';

	export let key: Key;
	export let component: Container;

	/*
		- component may be nil before mount
		- listen to dirty to force a re-render
	*/
	$: if (component && $dirty && _components.get(component)?.key == key) {
		// appendChild forces a move, not a copy - we can safely use this as the DOM
		// handles ownership of the node for us
		container.appendChild(component);
	}

	let container: HTMLDivElement;

	onDestroy(() => {
		// check if we own the component
		const { limbo, key: localKey } = _components.get(component) || {};

		if (localKey !== key) return;
		_components.delete(component);

		// move the component back to the limbo till it gets re-mounted
		limbo?.appendChild(component);

		// trigger a re-render
		dirty.set(Symbol());
	});
</script>

<div style="display: contents;" bind:this={container} />
