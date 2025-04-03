<script>
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let isOpen = false;
	export let location;
	export let onClose;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

</script>

{#if isOpen && location && mounted}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
		transition:fade={{ duration: 350 }}>
		<!-- Background overlay -->
		<div
			class="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
			aria-hidden="true"
			onclick={onClose}>
		</div>

		<!-- Modal panel  -->
		<div
			class="relative z-10 w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
			transition:fly={{ y: 0, duration: 350 }}>
			<!-- Close button -->
			<button
				type="button"
				class="absolute top-4 right-4 cursor-pointer text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
				onclick={onClose}
				aria-label="Close modal">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>

			<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div class="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="mb-4 text-lg leading-6 font-medium text-gray-900" id="modal-title">
							{location.Name || 'Location Details'}
						</h3>

						<!-- Tabs for organizing details -->
						<div class="mb-4 border-b border-gray-200">
							<nav class="-mb-px flex" aria-label="Tabs">
								<button
									class="border-b-2 border-blue-500 px-6 py-4 text-sm font-medium whitespace-nowrap text-blue-600"
									type="button"
									aria-current="page">
									Overview
								</button>
								<button
									class="border-b-2 border-transparent px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
									type="button">
									Metrics History
								</button>
								<button
									class="border-b-2 border-transparent px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
									type="button">
									Table View
								</button>
								<button
									class="border-b-2 border-transparent px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
									type="button">
									Chart View
								</button>
							</nav>
						</div>

						<!-- Modal content with details table -->
						<div class="overflow-x-auto">
							<table class="min-w-full divide-y divide-gray-200">
								<thead class="bg-gray-50">
									<tr>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
											Metric
										</th>
										<th
											scope="col"
											class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
											Value
										</th>
									</tr>
								</thead>
								<tbody class="divide-y divide-gray-200 bg-white">
									<!-- Location Info-->
									<tr>
										<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
											Info
										</td>
										<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
											<div>
												<b>Name:</b>
												{location.Name || '-'}
											</div>
											<div>
												<b>Sector:</b>
												{location.Type || '-'}
											</div>
											<div>
												<b>State:</b>
												{location.State || '-'}
											</div>
											<div>
												<b>Country:</b>
												{location.Country || '-'}
											</div>
										</td>
									</tr>

									<!-- Rating Stats -->
									<tr>
										<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
											Rating Stats
										</td>
										<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
											<div>
												<b>Average Rating:</b>
												{location.latest_metric.Rating || '-'}
											</div>
											<div>
												<b>Reviews Count:</b>
												{location.latest_metric.Reviews || '-'}
											</div>
											<div>
												<b>Photos Count:</b>
												{location.latest_metric.PhotosCount || '-'}
											</div>
										</td>
									</tr>

									<!-- Reviews by Star -->
									<tr>
										<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
											Reviews by Star
										</td>
										<td class="px-6 py-4 text-sm whitespace-normal text-gray-500">
											<div class="grid grid-cols-5 gap-2">
												<div>
													<b>5★:</b>
													{location.latest_metric.ReviewsPerScore5 || '-'}
												</div>
												<div>
													<b>4★:</b>
													{location.latest_metric.ReviewsPerScore4 || '-'}
												</div>
												<div>
													<b>3★:</b>
													{location.latest_metric.ReviewsPerScore3 || '-'}
												</div>
												<div>
													<b>2★:</b>
													{location.latest_metric.ReviewsPerScore2 || '-'}
												</div>
												<div>
													<b>1★:</b>
													{location.latest_metric.ReviewsPerScore1 || '-'}
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
