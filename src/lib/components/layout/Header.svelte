<script>
    export let title = "Dashboard";
    
    function handleNotification() {
      alert("Notifications clicked");
    }
    
    function handleSearch(event) {
      console.log("Searching for:", event.target.value);
    }
  </script>
  
  <header class="bg-white shadow h-16 flex items-center px-6 justify-between">
    <h1 class="text-xl font-semibold text-gray-800">{title}</h1>
    
    <div class="flex items-center space-x-4">
      <!-- Search -->
      <div class="relative">
        <input 
          type="text" 
          placeholder="Search..." 
          on:input={handleSearch}
          class="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-64"
        />
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>
      
      <!-- Notification button -->
      <button 
        on:click={handleNotification}
        class="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
        <span class="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
      </button>
    </div>
  </header>