<!-- 
	Limbo is a place to initialize the element,
	and serves as a hidden space to keep track of nodes.

	Since Limbo owns the lifecycle of the current element,
    the moment that Limbo gets destroyed, it will destroy its child element
    that it *thinks* it owns. Because of this, it is quite safe to destroy and reinitialize
	a Limbo component without causing unintended side effects to the DOM.
-->

<script lang="ts">
	import { _components } from '$lib/Portal.svelte';
	import { onMount } from 'svelte';

	export let component: HTMLElement;
	let container: HTMLDivElement;

	// Register the component and its limbo
	onMount(() => _components.set(component, { ..._components.get(component), limbo: container }));
</script>

<!-- 
    We don't want to render this component, 
    but we use it as the initial holder before teleporting it.
    This allows us to have a safe fallback
	for when a Portal gets destroyed.

    We also wrap it to guarantee that `component` is a DOM component,
    since we can't guarantee that all svelte components only have 1 root node.
-->
<div hidden bind:this={container}>
	<div style="display: contents;" bind:this={component}><slot /></div>
</div>
