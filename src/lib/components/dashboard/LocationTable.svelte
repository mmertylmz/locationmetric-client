<script>
	export let locations = [];
	export let isLoading = false;

	// Status badge styling helper
	function getStatusClass(status) {
		switch (status.toLowerCase()) {
			case 'active':
				return 'bg-green-100 text-green-800';
			case 'inactive':
				return 'bg-gray-100 text-gray-800';
			case 'maintenance':
				return 'bg-yellow-100 text-yellow-800';
			case 'error':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-blue-100 text-blue-800';
		}
	}
</script>

<div class="overflow-hidden rounded-lg bg-white shadow">
	<div class="border-b border-gray-200 px-6 py-4">
		<h2 class="text-lg font-medium">Locations</h2>
	</div>

	{#if isLoading}
		<div class="p-6 text-center">
			<p>Loading locations data...</p>
		</div>
	{:else if locations.length === 0}
		<div class="p-6 text-center">
			<p class="text-gray-500">No locations found</p>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							ID
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Name
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Status
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Last Update
						</th>
						<th
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Actions
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each locations as location}
						<tr>
							<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
								{location.id}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{location.name}</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									class={`inline-flex rounded-full px-2 py-1 text-xs ${getStatusClass(location.status)}`}>
									{location.status}
								</span>
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								{location.lastUpdate}
							</td>
							<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
								<div class="flex space-x-2">
									<button class="text-blue-600 hover:text-blue-900">View</button>
									<button class="text-gray-600 hover:text-gray-900">Edit</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
