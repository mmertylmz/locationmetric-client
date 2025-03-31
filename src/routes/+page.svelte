<script>
	import { onMount } from 'svelte';
	import { locationsAPI } from '$lib/api';

	let stats = $state({
		totalLocations: 0,
		verifiedLocations: 0,
		unverifiedLocations: 0,
	});

	let recentLocations = $state([]);
	let isLoading = $state(true);
	let locationCounts = $state({});
	let error = $state(null);

	async function loadLocationCounts() {
		try {
			isLoading = true;
			error = null;
			const response = await locationsAPI.getLocationCounts();
			stats.totalLocations = response.total;
			stats.verifiedLocations = response.verified_count;
			stats.unverifiedLocations = response.unverified_count;
		} catch (err) {
			error = err | 'Failed to fetch location counts';
			console.error('Error fetching location counts:', error);
		} finally {
			isLoading = false;
		}
	}

	onMount(async () => {
		loadLocationCounts();
	});
</script>

<div class="space-y-6">
	<h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

	{#if isLoading}
		<div class="flex justify-center p-8">
			<p>Loading dashboard data...</p>
		</div>
	{:else}
		<!-- Stats Grid -->
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<!-- Total Locations -->
			<div class="rounded-lg bg-white p-6 shadow">
				<div class="flex items-center">
					<div class="rounded-full bg-blue-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-blue-600">
							<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
							<circle cx="12" cy="10" r="3"></circle>
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-sm font-medium text-gray-500">Total Locations</h3>
						<p class="text-2xl font-semibold">{stats.totalLocations}</p>
					</div>
				</div>
			</div>

			<!-- Verified Locations -->
			<div class="rounded-lg bg-white p-6 shadow">
				<div class="flex items-center">
					<div class="rounded-full bg-green-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-green-600">
							<path d="m9 12 2 2 4-4"></path>
							<circle cx="12" cy="12" r="10"></circle>
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-sm font-medium text-gray-500">Verified Locations</h3>
						<p class="text-2xl font-semibold text-green-700">{stats.verifiedLocations}</p>
					</div>
				</div>
			</div>

			<!-- Unverified Locations -->
			<div class="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md">
				<div class="flex items-center">
					<div class="rounded-full bg-orange-100 p-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-orange-600">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
					</div>
					<div class="ml-4">
						<h3 class="text-sm font-medium text-gray-500">Unverified Locations</h3>
						<p class="text-2xl font-semibold text-orange-700">{stats.unverifiedLocations}</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Recent Locations Table -->
		<div class="overflow-hidden rounded-lg bg-white shadow">
			<div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
				<h2 class="text-lg font-medium">Recent Locations</h2>
				<a href="/locations" class="text-sm font-medium text-blue-600 hover:text-blue-800">
					View all
				</a>
			</div>
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
								Name
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
								Status
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
								Visits
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
								Last Activity
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each recentLocations as location}
							<tr>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="font-medium text-gray-900">{location.name}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span
										class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold
                    {location.status === 'active'
											? 'bg-green-100 text-green-800'
											: 'bg-yellow-100 text-yellow-800'}">
										{location.status}
									</span>
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-gray-500">
									{location.visits}
								</td>
								<td class="px-6 py-4 whitespace-nowrap text-gray-500">
									{location.lastActive}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>
