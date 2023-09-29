<script lang="ts">
	import { onMount } from 'svelte';
	import { Portal, Limbo, teleport } from '$lib';
	import Highlight, { LineNumbers } from 'svelte-highlight';
	import xml from 'svelte-highlight/languages/xml';
	import github from 'svelte-highlight/styles/github';

	const code = `<script lang="ts">
	import { onMount } from 'svelte';
	import { Portal, Limbo, teleport } from 'svelte-reparent';

	let component: HTMLElement;

	function send(label: string) {
		return () => teleport(component, label);
	}

	onMount(send('a'));
${`<` + `/script>`}

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
</main>`;

	let component: HTMLElement;

	function send(label: string) {
		return () => {
			teleport(component, label);
		};
	}

	onMount((): void => send('a')());
</script>

<svelte:head>
	<title>svelte-reparent</title>
	{@html github}
</svelte:head>

<main>
	<h1>svelte-reparent</h1>
	<h2>
		svelte's missing reparenting utility | alternative to <a
			href="https://github.com/paol-imi/react-reparenting">react-reparent.</a
		>
	</h2>
	<h3>
		<a href="https://github.com/LeoDog896/svelte-reparent">GitHub</a> |
		<a href="https://npmjs.com/package/svelte-reparent">npm</a>
	</h3>

	<div class="demo">
		<h1>Demo</h1>

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
	</div>

	<h2>Explanation</h2>
	<p>
		svelte-reparent uses a <span class="keyword">limbo</span> to store the component to be moved
		around, and different <span class="keyword">portals</span> that the component can move to.
	</p>
	<p>
		<span class="keyword">limbo</span> is an invisible component, and any thing inside of it will be
		hidden.
		<span class="keyword">portals</span> are the visible components that the component can move to.
	</p>
	<p>
		When <span class="keyword">portals</span> are destroyed, they will move the component back to
		<span class="keyword">limbo</span>. When <span class="keyword">limbo</span> is destroyed, it will
		completely destroy the component, no matter where it is.
	</p>
	<p>
		A component has portal ID metadata attatched to it, allowing the component to be <span
			class="keyword">owned</span
		> by portals, creating a safe way to move components around.
	</p>
	<p>
		As mentioned in the example, the input has an "unkept state". This is state that isn't stored by
		svelte, demonstrating that the original element is only moved, not re-rendered.
	</p>

	<h2>Example Code</h2>

	<Highlight language={xml} {code} let:highlighted>
		<LineNumbers {highlighted} />
	</Highlight>

	<hr />

	<p>made with ❤️ by <a href="https://github.com/LeoDog896">leo</a></p>
</main>

<style>
	span.keyword {
		font-family: 'Courier New', Courier, monospace;
		background-color: #eee;
		padding: 0.1rem 0.3rem;
		border-radius: 0.3rem;
	}

	main {
		margin: 1rem;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.demo {
		margin: 1rem;
		border: 1px solid black;
		padding: 1rem;
	}

	.container {
		border: 1px solid black;
		margin: 1rem 0;
		padding: 1rem;
	}

	h2,
	h3 {
		font-weight: normal;
	}
</style>
