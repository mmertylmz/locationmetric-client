<script>
	export let title = '';
	export let value = '';
	export let change = null; // can be a number like 12.5 or -8.3
	export let icon = ''; // icon name

	// Determine change styling
	$: changeClass = !change ? '' : change > 0 ? 'text-green-500' : 'text-red-500';
	$: changeIcon = !change ? '' : change > 0 ? 'trend-up' : 'trend-down';
</script>

<div class="rounded-lg bg-white p-6 shadow">
	<div class="flex items-center justify-between">
		<div>
			<p class="text-sm font-medium text-gray-500">{title}</p>
			<p class="mt-2 text-2xl font-semibold">{value}</p>

			{#if change !== null}
				<div class="mt-2 flex items-center {changeClass}">
					<span>
						{#if changeIcon === 'trend-up'}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
								<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
								<polyline points="17 6 23 6 23 12"></polyline>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
								<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
								<polyline points="17 18 23 18 23 12"></polyline>
							</svg>
						{/if}
					</span>
					<span class="ml-1 text-sm">{Math.abs(change)}%</span>
				</div>
			{/if}
		</div>

		<div class="rounded-full bg-purple-100 p-3 text-purple-600">
			{#if icon === 'users'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
					<circle cx="9" cy="7" r="4"></circle>
					<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
					<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
				</svg>
			{:else if icon === 'locations'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
					<circle cx="12" cy="10" r="3"></circle>
				</svg>
			{:else if icon === 'analytics'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line x1="12" y1="20" x2="12" y2="10"></line>
					<line x1="18" y1="20" x2="18" y2="4"></line>
					<line x1="6" y1="20" x2="6" y2="16"></line>
				</svg>
			{/if}
		</div>
	</div>
</div>
