<script>
  import { onMount } from 'svelte';
  
  // Correct Svelte 5 runes syntax
  let stats = $state({
    totalLocations: 0,
    activeLocations: 0,
    visits: 0,
    averageTime: 0
  });
  
  let recentLocations = $state([]);
  let isLoading = $state(true);
  
  // Fetch dashboard data (simulated)
  onMount(async () => {
    // Simulate API call
    setTimeout(() => {
      stats = {
        totalLocations: 24,
        activeLocations: 18,
        visits: 1452,
        averageTime: 37
      };
      
      recentLocations = [
        { id: 1, name: 'Tokyo Office', status: 'active', visits: 234, lastActive: '2h ago' },
        { id: 2, name: 'New York HQ', status: 'active', visits: 186, lastActive: '5m ago' },
        { id: 3, name: 'London Branch', status: 'maintenance', visits: 0, lastActive: '3d ago' },
        { id: 4, name: 'Sydney Store', status: 'active', visits: 92, lastActive: '1h ago' },
      ];
      
      isLoading = false;
    }, 800);
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
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Locations -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Total Locations</h3>
            <p class="text-2xl font-semibold">{stats.totalLocations}</p>
          </div>
        </div>
      </div>
      
      <!-- Active Locations -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="m9 12 2 2 4-4"></path><circle cx="12" cy="12" r="10"></circle></svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Active Locations</h3>
            <p class="text-2xl font-semibold">{stats.activeLocations}</p>
          </div>
        </div>
      </div>
      
      <!-- Total Visits -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Total Visits</h3>
            <p class="text-2xl font-semibold">{stats.visits}</p>
          </div>
        </div>
      </div>
      
      <!-- Average Visit Time -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div class="ml-4">
            <h3 class="text-sm font-medium text-gray-500">Avg. Visit Time</h3>
            <p class="text-2xl font-semibold">{stats.averageTime} min</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Locations Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-medium">Recent Locations</h2>
        <a href="/locations" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View all</a>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each recentLocations as location}
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{location.name}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    {location.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
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