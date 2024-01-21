<script context="module" lang="ts">
	import { writable, get } from 'svelte/store';

	type Container = HTMLElement;
	type Key = string | number | symbol;

	/**
	 * Universal map to keep track of what portal a component wants to be in,
	 * as well as its original limbo owner.
	 * 
	 * While this is a store, Map is a reference type, so we can modify it directly.
	 * Manual updating ($_components.set) is required to force a re-render.
	 *
	 * @internal
	 * DON'T MODIFY EXTERNALLY!
	 * Doing so is **undefined behavior**.
	 */
	export let _components = writable(new Map<
		Container,
		{
			limbo?: HTMLElement;
			key?: Key;
		}
	>());

	/**
	 * Moves a component to a new container.
	 * @param component The component to move
	 * @param key The key of the container to move to
	 */
	export async function teleport(component: Container, key: Key) {
		get(_components).set(component, { ...get(_components).get(component), key });

		// force a re-render
		_components.set(get(_components));
	}
</script>

<script lang="ts">
	import { onDestroy } from 'svelte';

	export let key: Key;
	export let component: Container;

	// component may be nil before mount
	$: if (component &&  $_components.get(component)?.key == key) {
		// appendChild forces a move, not a copy - we can safely use this as the DOM
		// handles ownership of the node for us
		container.appendChild(component);
	}

	let container: HTMLDivElement;

	onDestroy(() => {
		// check if we own the component
		const { limbo, key: localKey } = $_components.get(component) || {};

		if (localKey !== key) return;
		$_components.delete(component);

		// move the component back to the limbo till it gets re-mounted
		limbo?.appendChild(component);

		// force a re-render
		$_components = $_components;
	});
</script>

<div style="display: contents;" bind:this={container} />
