<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	// Navigation items
	const navItems = [
		{ name: 'Dashboard', href: '/', icon: 'home' },
		{ name: 'Locations', href: '/locations', icon: 'map-pin' },
		{ name: 'Analytics', href: '/analytics', icon: 'bar-chart' },
		{ name: 'Settings', href: '/settings', icon: 'settings' },
	];

	// Check if a route is active
	$: isActive = (path) => (browser ? $page.url.pathname === path : false);
</script>

<aside class="fixed inset-y-0 left-0 flex w-64 flex-col bg-slate-800 text-white">
	<!-- Logo/Header -->
	<div class="border-b border-slate-700 p-4">
		<h1 class="text-xl font-bold">Location Metric</h1>
		<p class="text-sm text-slate-400">Dashboard</p>
	</div>

	<!-- Navigation -->
	<nav class="flex-1 overflow-y-auto py-4">
		<ul class="space-y-1">
			{#each navItems as item}
				<li>
					<a
						href={item.href}
						class="flex items-center px-4 py-3 {isActive(item.href)
							? 'bg-slate-700 font-medium text-white'
							: 'text-slate-300 hover:bg-slate-700'} 
				mx-2 rounded-lg transition-colors duration-150">
						<!-- Simple icon placeholders -->
						<span class="mr-3 flex h-5 w-5 items-center justify-center">
							{#if item.icon === 'home'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
									<polyline points="9 22 9 12 15 12 15 22"></polyline>
								</svg>
							{:else if item.icon === 'map-pin'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
							{:else if item.icon === 'bar-chart'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
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
							{:else if item.icon === 'settings'}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round">
									<path
										d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z">
									</path>
									<circle cx="12" cy="12" r="3"></circle>
								</svg>
							{/if}
						</span>
						{item.name}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<!-- Footer area -->
	<div class="mt-auto border-t border-slate-700 p-4">
		<div class="flex items-center">
			<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-600">
				<span class="text-sm font-medium">US</span>
			</div>
			<div>
				<p class="text-sm font-medium">User Name</p>
				<p class="text-xs text-slate-400">Administrator</p>
			</div>
		</div>
	</div>
</aside>
