<script>
	import { onMount } from 'svelte';
	import { locationsAPI } from '$lib/api';

	// Svelte 5 state with proper runes syntax
	let isLoading = $state(true);
	let error = $state(null);
	let locations = $state([]);
	let filterStatus = $state('all');
	let searchTerm = $state('');

	// Pagination Variables
	let currentPage = $state(1);
	let pageSize = $state(10);
	let totalItems = $state(0);

	//API call to fetch locations
	async function loadLocations() {
		isLoading = true;
		error = null;
		try {
			const params = {
				skip: (currentPage - 1) * pageSize,
				limit: pageSize,
			};

			if (searchTerm) {
				params.Name = searchTerm;
			}

			const data = await locationsAPI.getLocationsWithMetrics(params);

			locations = data.items || data;
			totalItems = data.total || locations.length;
		} catch (err) {
			error = err.message || 'Error loading locations';
			console.error(err);
		} finally {
			isLoading = false;
		}
	}

	function changePage(newPage) {
		currentPage = newPage;
		loadLocations();
	}

	function handleSearch() {
		currentPage = 1; // Reset to first page on search
		loadLocations();
	}

	// TODO: Filtering
	function setVerifiedFilter(verified) {
		if (filterStatus === verified) {
			filterStatus = 'all';
		} else {
			filterStatus = verified;
		}
	}

	let filteredLocations = $derived(
		locations.filter((loc) => {
			const statusFilter = filterStatus === 'all' || loc.Verified === filterStatus;

			const searchFilter =
				!searchTerm ||
				(loc.Name && loc.Name.toLowerCase().includes(searchTerm.toLowerCase())) ||
				(loc.Country && loc.Country.toLowerCase().includes(searchTerm.toLowerCase())) ||
				(loc.State && loc.State.toLowerCase().includes(searchTerm.toLowerCase()));

			return statusFilter && searchFilter;
		})
	);

	// TODO: View Details Function (modal planned)
	function viewDetails(location) {
		console.log('View Details');
	}

	// Load locations data
	onMount(async () => {
		loadLocations();
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-gray-900">Location Management</h1>
		<button class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
			Add New Location
		</button>
	</div>

	<!-- Search and Filters -->
	<div class="rounded-lg bg-white p-4 shadow">
		<div class="items-center justify-between md:flex">
			<!-- Search -->
			<div class="relative md:w-64">
				<input
					type="text"
					placeholder="Search locations..."
					class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={searchTerm}
					onkeyup={(e) => e.key === 'Enter' && handleSearch()} />

				<button
					class="absolute top-2.5 right-3 h-5 w-5 text-gray-400"
					onclick={handleSearch}
					aria-label="Search">
				</button>

				<svg
					class="absolute top-2.5 right-3 h-5 w-5 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>

			<!-- Filters -->
			<div class="mt-4 flex items-center space-x-2 md:mt-0">
				<span class="text-sm text-gray-500">Verified:</span>
				<button
					class="rounded-lg px-3 py-1 text-sm font-medium {filterStatus === 'all'
						? 'bg-gray-200 text-gray-800'
						: 'bg-white'}"
					onclick={() => setVerifiedFilter('all')}>
					All
				</button>
				<button
					class="rounded-lg px-3 py-1 text-sm font-medium {filterStatus === true
						? 'bg-green-100 text-green-800'
						: 'bg-white'}"
					onclick={() => setVerifiedFilter(true)}>
					Active
				</button>
				<button
					class="rounded-lg px-3 py-1 text-sm font-medium {filterStatus === false
						? 'bg-red-100 text-red-800'
						: 'bg-white'}"
					onclick={() => setVerifiedFilter(false)}>
					Inactive
				</button>
			</div>
		</div>
	</div>

	{#if error}
		<div class="border-l-4 border-red-500 bg-red-100 p-4 text-red-700" role="alert">
			<p class="font-medium">An error has occurred.</p>
			<p>{error}</p>
			<button class="mt-2 text-red-600 underline" onclick={() => loadLocations()}>
				Try again.
			</button>
		</div>
	{/if}

	{#if isLoading}
		<div class="flex justify-center p-8">
			<p>Loading locations...</p>
		</div>
	{:else}
		<!-- Locations Table -->
		<div class="relative rounded-lg bg-white shadow">
			<div class="overflow-x-auto max-w-full" >
			<table class="w-full divide-y divide-gray-200">
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
							Sector
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							State
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Country
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Average Rating
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Reviews Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							Photos Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							5 Star Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							4 Star Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							3 Star Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							2 Star Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
							1 Star Count
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
							Verified
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
							Link
						</th>
						<th
							scope="col"
							class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
							View Details
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each filteredLocations as location}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="font-medium text-gray-900">{location.Name || 'Unnamed Location'}</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.Type || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.State || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.Country || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.Rating || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.Reviews || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.PhotosCount || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.ReviewsPerScore5 || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.ReviewsPerScore4 || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.ReviewsPerScore3 || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.ReviewsPerScore2 || '-'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-gray-500">
								{location.latest_metric.ReviewsPerScore1 || '-'}
							</td>
							<td class="px-6 py-4 text-center whitespace-nowrap">
								<span
									class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold
                  {location.Verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
									{location.Verified ? 'Active' : 'Inactive'}
								</span>
							</td>
							<td class="px-6 py-4 text-center whitespace-nowrap text-gray-500">
								{#if location.LocationLink}
									<a
										href={location.LocationLink}
										target="_blank"
										rel="noopener noreferrer"
										class="text-gray-800 hover:text-blue-700"
										aria-label="Location Link">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="inline-block h-5 w-5"
											viewBox="0 0 384 512"
											fill="currentColor">
											<!-- Font Awesome Map Marker Icon -->
											<path
												d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
										</svg>
									</a>
								{:else}
									<span class="text-gray-400">-</span>
								{/if}
							</td>
							<td class="px-6 py-4 text-center text-sm font-medium whitespace-nowrap">
								<button
									class="rounded-full p-1.5 text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-700"
									aria-label="View details"
									onclick={() => viewDetails(location)}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round">
										<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
										<circle cx="12" cy="12" r="3"></circle>
									</svg>
								</button>
							</td>
						</tr>
					{/each}

					{#if filteredLocations.length === 0}
						<tr>
							<td colspan="5" class="px-6 py-8 text-center text-gray-500">
								{#if searchTerm}
									No locations found matching "{searchTerm}".
								{:else}
									No locations found.
								{/if}
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
		</div>
		<!-- Pagination -->
		{#if totalItems > pageSize}
			<div class="mt-6 flex justify-center">
				<nav class="flex items-center space-x-2">
					<button
						class="rounded-md border px-3 py-1 {currentPage === 1
							? 'cursor-not-allowed bg-gray-100'
							: 'hover:bg-gray-50'}"
						disabled={currentPage === 1}
						onclick={() => changePage(currentPage - 1)}>
						&laquo; Önceki
					</button>

					{#each Array(Math.ceil(totalItems / pageSize)) as _, index}
						<button
							class="rounded-md px-3 py-1 {currentPage === index + 1
								? 'bg-blue-600 text-white'
								: 'border hover:bg-gray-50'}"
							onclick={() => changePage(index + 1)}>
							{index + 1}
						</button>
					{/each}

					<button
						class="rounded-md border px-3 py-1 {currentPage >= Math.ceil(totalItems / pageSize)
							? 'cursor-not-allowed bg-gray-100'
							: 'hover:bg-gray-50'}"
						disabled={currentPage >= Math.ceil(totalItems / pageSize)}
						onclick={() => changePage(currentPage + 1)}>
						Sonraki &raquo;
					</button>
				</nav>
			</div>
		{/if}
	{/if}
</div>
