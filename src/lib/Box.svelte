<!--
	This is a dummy component, but it forces Svelte to take control of
	that node, allowing `bind:this` to reference the svelte component.

	With this, we can take control of the svelte internal component lifecycle,
	allowing us to lie to svelte components about its new parent.

    We use this in Portal to ensure that the components are not regular DOM components
-->

<slot />