<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/profile">Profile</router-link>
        <router-link to="/logout">Logout</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2023 LGU Cordova Attendance and Leave Tracker</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(() => {
  // Check authentication status and redirect if necessary
  const isAuthenticated = localStorage.getItem('authToken');
  if (!isAuthenticated && router.currentRoute.value.path !== '/') {
    router.push('/');
  }
});
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #007bff;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: space-around;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #0056b3;
}

main {
  flex: 1;
  padding: 2rem;
}

footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}
</style>
