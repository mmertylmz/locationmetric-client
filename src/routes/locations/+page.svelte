<script>
  import { onMount } from 'svelte';
  
  // Svelte 5 state with proper runes syntax
  let isLoading = $state(true);
  let locations = $state([]);
  let filterStatus = $state('all');
  let searchTerm = $state('');
  
  // Load locations data
  onMount(async () => {
    // Simulate API call
    setTimeout(() => {
      locations = [
        { 
          id: 1, 
          name: 'Tokyo Office', 
          address: '1-2-3 Shibuya, Tokyo, Japan',
          status: 'active', 
          visits: 234, 
          lastActive: '2h ago' 
        },
        { 
          id: 2, 
          name: 'New York HQ', 
          address: '123 Broadway, New York, NY, USA',
          status: 'active', 
          visits: 186, 
          lastActive: '5m ago' 
        },
        { 
          id: 3, 
          name: 'London Branch', 
          address: '10 Downing St, London, UK',
          status: 'maintenance', 
          visits: 0, 
          lastActive: '3d ago' 
        },
        { 
          id: 4, 
          name: 'Sydney Store', 
          address: '42 George St, Sydney, Australia',
          status: 'active', 
          visits: 92, 
          lastActive: '1h ago' 
        },
        { 
          id: 5, 
          name: 'Berlin Office', 
          address: 'Unter den Linden 10, Berlin, Germany',
          status: 'inactive', 
          visits: 0, 
          lastActive: '1w ago' 
        },
      ];
      
      isLoading = false;
    }, 800);
  });
  
  // Filtered locations based on search and filter
  let filteredLocations = $derived(locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        loc.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || loc.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  }));
  
  // Filter by status
  function setStatusFilter(status) {
    filterStatus = status;
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Location Management</h1>
    <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
      Add New Location
    </button>
  </div>
  
  <!-- Search and Filters -->
  <div class="bg-white p-4 rounded-lg shadow">
    <div class="md:flex items-center justify-between">
      <!-- Search -->
      <div class="relative md:w-64">
        <input 
          type="text" 
          placeholder="Search locations..." 
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          bind:value={searchTerm}
        />
        <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      
      <!-- Filters -->
      <div class="mt-4 md:mt-0 flex items-center space-x-2">
        <span class="text-sm text-gray-500">Status:</span>
        <button 
          class="px-3 py-1 text-sm font-medium rounded-lg {filterStatus === 'all' ? 'bg-gray-200' : 'bg-white'}"
          onclick={() => setStatusFilter('all')}
        >
          All
        </button>
        <button 
          class="px-3 py-1 text-sm font-medium rounded-lg {filterStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-white'}"
          onclick={() => setStatusFilter('active')}
        >
          Active
        </button>
        <button 
          class="px-3 py-1 text-sm font-medium rounded-lg {filterStatus === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-white'}"
          onclick={() => setStatusFilter('maintenance')}
        >
          Maintenance
        </button>
        <button 
          class="px-3 py-1 text-sm font-medium rounded-lg {filterStatus === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-white'}"
          onclick={() => setStatusFilter('inactive')}
        >
          Inactive
        </button>
      </div>
    </div>
  </div>
  
  {#if isLoading}
    <div class="flex justify-center p-8">
      <p>Loading locations...</p>
    </div>
  {:else}
    <!-- Locations Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Address</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visits</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each filteredLocations as location}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{location.name}</div>
                <div class="text-sm text-gray-500">{location.address}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  {location.status === 'active' ? 'bg-green-100 text-green-800' : 
                   location.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 
                   'bg-red-100 text-red-800'}">
                  {location.status}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {location.visits}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {location.lastActive}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          {/each}
          
          {#if filteredLocations.length === 0}
            <tr>
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                No locations found matching your filters.
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  {/if}
</div>