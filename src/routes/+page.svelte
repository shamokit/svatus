<script lang="ts">
	let { data } = $props();
	let { _message1xx, _message2xx, _message3xx, _message4xx, _message5xx } = data;
</script>

<svelte:head>
	<title>Svatus</title>
</svelte:head>
<h1>Return status code</h1>
<p>
	<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
		>https://developer.mozilla.org/en-US/docs/Web/HTTP/Status</a
	>
</p>

{#snippet sectionStatusCode({ title, object, json })}
	<section>
		<h2>{title}</h2>
		<table class="table">
			<thead>
				<tr>
					<th>path</th>
					<th>status code</th>
					<th>description</th>
					<th>response json</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(object) as key}
					<tr>
						<td><code>/status/{key}</code></td>
						<td>{key}</td>
						<td>{object[key]}</td>
						<td
							>{#if json}<a href="/status/{key}">https://svatus.pages.dev/status/{key}</a>{:else}not
								json{/if}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
{/snippet}
<main class="sections">
	{@render sectionStatusCode({ title: '1xx', object: _message1xx, json: false })}
	{@render sectionStatusCode({ title: '2xx', object: _message2xx, json: true })}
	{@render sectionStatusCode({ title: '3xx', object: _message3xx, json: false })}
	{@render sectionStatusCode({ title: '4xx', object: _message4xx, json: true })}
	{@render sectionStatusCode({ title: '5xx', object: _message5xx, json: true })}
</main>

<style>
	.sections {
		display: grid;
		gap: 60px;
	}
	table {
		width: 100%;
	}
	th,
	td {
		padding: 0.5em 1em;
		border: 1px solid #ccc;
		text-align: left;
	}
	thead th {
		background: #eee;
	}
	code {
		user-select: all;
	}
	a:hover {
		text-decoration: none;
	}
</style>
