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

{#snippet sectionStatusCode({ title, object })}
	<section>
		<h2>{title}</h2>
		<table class="table">
			<thead>
				<tr>
					<th>url</th>
					<th>status code</th>
					<th>description</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(object) as key}
					<tr>
						<td><code>/status/{key}</code></td>
						<td>{key}</td>
						<td>{object[key]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
{/snippet}
<main class="sections">
	{@render sectionStatusCode({ title: '1xx', object: _message1xx })}
	{@render sectionStatusCode({ title: '2xx', object: _message2xx })}
	{@render sectionStatusCode({ title: '3xx', object: _message3xx })}
	{@render sectionStatusCode({ title: '4xx', object: _message4xx })}
	{@render sectionStatusCode({ title: '5xx', object: _message5xx })}
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
</style>
