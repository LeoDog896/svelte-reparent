<!-- 
	Limbo is a place to initialize the element,
	and serves as a hidden space to keep track of nodes.

	**WARNING**: Since Limbo owns the lifecycle of the current element,
    the moment that Limbo gets destroyed, it will destroy its child element
    that it *thinks* it owns.
-->

<script lang="ts">
	import { _components } from '$lib/Portal.svelte';
	import { onMount } from 'svelte';

	export let component: HTMLElement;

	onMount(() => {
		_components.set(component, { ..._components.get(component), limbo: component });
	});
</script>

<!-- 
    We don't want to render this component, 
    but we use it as the initial holder before teleporting it.
    This allows us to manage when a Portal gets destroyed without 
    destroying the current node.

    We also wrap it to guarantee that `component` is a DOM component,
    since we can't guarantee that all svelte components only have 1 root node.
-->
<div style="display: contents;" bind:this={component} hidden><slot /></div>
