<script context="module" lang="ts">
    import type { SvelteComponent } from "svelte";

    type StrictSvelteComponent = SvelteComponent<unknown, unknown, unknown>;

	const components: { [key: StrictSvelteComponent]: string } = {
		
	}
	
	export function teleport(component: StrictSvelteComponent, key: string) {
		components[component] = key;
	}

	export function hasComponent(component: StrictSvelteComponent) {
		return components[component] !== undefined;
	}
</script>

<script lang="ts">
	export let key: string;
	export let component: SvelteComponent;

	let container: HTMLDivElement;
</script>

<div style="display: contents" bind:this={container} hidden={components[component] != key} />
