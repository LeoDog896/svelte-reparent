<!-- 
	Limbo is a place to initialize the element,
	and serves as a hidden space to keep track of nodes.

	**WARNING**: Since Limbo owns the lifecycle of the current element,
    the moment that Limbo gets destroyed, it will kill its child element
    that it *thinks* it owns.
-->

<script lang="ts">
	import Box from "./Box.svelte";
	import type { SvelteComponent } from "svelte";

	export let component: SvelteComponent;
</script>

<!-- 
    We don't want to render this component, 
    but we use it as the initial holder before teleporting it.
    this allows us to manage when a Portal gets destroyed without 
    destroying the current node.
-->
<div hidden>
    <!-- Wrap it in a box to guarantee that {component} is a Svelte component. -->
	<Box bind:this={component}><slot /></Box>
</div>
