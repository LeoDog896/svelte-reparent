<script context="module" lang="ts">
    import type { SvelteComponent } from "svelte";

	const components: { [key: SvelteComponent]: string } = {
		
	}
	
	export function teleport(component: SvelteComponent, key: string) {
		components[component] = key;
	}

	export function hasComponent(component: SvelteComponent) {
		return components[component] !== undefined;
	}
</script>

<script>
	export let key;
	export let component;

	let container;
</script>

<div style="display: contents" bind:this={container} hidden={components[component] != key} />
