<!-- 
	Limbo is a place to initialize the element,
	and serves as a hidden space to keep track of nodes.

	**WARNING**: Since Limbo owns the lifecycle of the current element,
    the moment that Limbo gets destroyed, it will kill its child element
    that it *thinks* it owns.
-->

<script lang="ts">
	export let component: HTMLElement;
</script>

<!-- 
    We don't want to render this component, 
    but we use it as the initial holder before teleporting it.
    this allows us to manage when a Portal gets destroyed without 
    destroying the current node.

        Wrap it in a box to guarantee that {component} is a DOM component,
        since we cant guarantee that all svelte components only have 1 root node.
-->
<div style="display: contents;" bind:this={component}><slot /></div>
