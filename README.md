# [svelte-reparent](https://leodog896.github.io/svelte-reparent)

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

## Advantages

- No need to worry about keeping state in sync between components.
- No dependencies on internal svelte APIs, unlike React and Vue alternatives.
- Simple API, with only three exported functions.

## Disadvantages

- Since this library is relatively new, there may be bugs. (Please report them! Every bug report helps!)

## Alternatives

If you're trying to teleport a node to a different location in the DOM, you can use
[svelte-portal](https://npmjs.com/package/svelte-portal) instead. This library
is better suited for teleporting *inside* the svelte app, rather than outside.

## How it works

This library is split into three main concepts:

- `Limbo`, which serves as the "owner" of a component to be teleported.
- `Portal`, which serves as the "receiver" of a component to be teleported, and displays it.
- Teleportation, which transfers borrowship of a component from one `Portal` to another.

The `Limbo` component is the "root" component of the `Portal` component. There is a global
registry, which maps component instances to what portal ID they belong in. When a `Portal`
is destroyed, it is moved back to `Limbo` and removed from the registry.

In order to move the DOM around, this library extensively uses `<div style="display: contents">`.
The usage of this allows for `svelte-reparent` to _ensure_ that svelte components
have a single root element, which is moved around (in the case of `Limbo`), or
appended to (in the case of `Portal`).
