<script>
	import '../app.css';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	
	let { children } = $props();
  </script>
  
  <div class="flex min-h-screen bg-gray-100">
	<!-- Sidebar -->
	<Sidebar />
	
	<!-- Main Content Area -->
	<div class="flex-1 ml-64 flex flex-col overflow-hidden">
	  <Header />
	  <main class="flex-1 p-6">
		{@render children()}
	  </main>
	</div>
  </div>