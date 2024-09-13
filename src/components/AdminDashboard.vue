<template>
  <div class="home-container">
    <aside class="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><router-link to="/admin-user">User Management</router-link></li>
        <li><router-link to="/admin-profile">Profile</router-link></li>
        <!-- Add more links or buttons as needed -->
        <li>
          <button @click="handleLogout" class="logout-button">Logout</button>
        </li>
      </ul>
    </aside>
    <main class="main-content">
      <div class="dashboard-container">
        <h1>Admin Dashboard</h1>
        <p>
          Welcome to the Admin Dashboard. Use the sidebar to navigate through
          different sections, manage users, view profile details, and more.
        </p>
        <!-- Add additional dashboard components or features here -->
        <router-view></router-view> <!-- This is where nested routes will be rendered -->
      </div>
    </main>
  </div>
</template>
<script>
export default {
  methods: {
    handleLogout() {
      // Handle logout logic, e.g., clear authentication tokens
      this.$router.push('/');
    },
  },
};
</script>
<style scoped>
.home-container {
  background-image: url('@/assets/logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #007bff;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 1rem;
}

.sidebar ul li a,
.sidebar ul li button {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar ul li a:hover,
.sidebar ul li button:hover {
  background-color: #0056b3;
}

.logout-button {
  background-color: blue;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c82333;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.dashboard-container {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.dashboard-container h1 {
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.dashboard-container p {
  font-size: 1rem;
  color: #333;
}
</style>
