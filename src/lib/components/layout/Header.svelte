<script>
	export let title = 'Dashboard';

	function handleNotification() {
		alert('Notifications clicked');
	}

	function handleSearch(event) {
		console.log('Searching for:', event.target.value);
	}
</script>

<header class="flex h-16 items-center justify-between bg-white px-6 shadow">
	<h1 class="text-xl font-semibold text-gray-800">{title}</h1>

	<div class="flex items-center space-x-4">
		<!-- Search -->
		<div class="relative">
			<input
				type="text"
				placeholder="Search..."
				on:input={handleSearch}
				class="w-64 rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500" />
			<div class="absolute top-2.5 left-3 text-gray-400">
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
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>
		</div>

		<!-- Notification button -->
		<button
			on:click={handleNotification}
			class="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round">
				<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
				<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
			</svg>
			<span
				class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
				3
			</span>
		</button>
	</div>
</header>
