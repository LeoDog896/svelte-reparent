# [svelte-portal](https://leodog896.github.io/svelte-portal)

Reparent elements with ease. Svelte non-internal using alternative to [react-reparenting](https://github.com/paol-imi/react-reparenting).

## Example

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { Portal, Limbo, teleport } from '$lib';

	let component: HTMLElement;

	function send(label: string) {
		return () => {
			teleport(component, label);
		};
	}

	onMount((): void => send('a')());
</script>

<main>
	<Limbo bind:component>
		<input placeholder="Enter unkept state" />
	</Limbo>
	<div class="container">
		<h1>Container A</h1>
		<Portal key="a" {component} />
		<button on:click={send('a')}>Move Component Here</button>
	</div>
	<div class="container">
		<h1>Container B</h1>
		<Portal key="b" {component} />
		<button on:click={send('b')}>Move Component Here</button>
	</div>
</main>
```

## How it works

This library is split into three main concepts:
- `Limbo`, which serves as the "owner" of a component to be teleported.
- `Portal`, which serves as the "receiver" of a component to be teleported, and displays it.
- Teleportation, which transfers borrowship of a component from one `Portal` to another.

The `Limbo` component is the "root" component of the `Portal` component. There is a global
registry, which maps component instances to what portal ID they belong in. When a `Portal`
is destroyed, it is moved back to `Limbo` and removed from the registry.

In order to move the DOM around, this library extensively uses `<div style="display: contents">`.
The usage of this allows for `svelte-portal` to *ensure* that svelte components
have a single root element, which is moved around (in the case of `Limbo`), or
appended to (in the case of `Portal`).
