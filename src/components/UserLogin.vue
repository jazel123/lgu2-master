<template>
  <div class="container">
    <div class="description" :class="{ 'slide-in': showDescription }">
      <h1>Welcome to LGU Cordova</h1>
      <p>
        The Attendance and Leave Tracker helps manage and monitor attendance and leave requests efficiently.
        Designed specifically for local government units, it streamlines the process, making it easy for employees
        and administrators to handle attendance records and leave requests.
      </p>
    </div>
    <div class="form-container" :class="{ 'fade-in': showForm }">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <p>Don't have an account? <router-link to="/register" class="register-link">Register here</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const email = ref('');
const password = ref('');
const showForm = ref(false);
const showDescription = ref(false);
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email.value === 'admin@gmail.com') {
    router.push('/admin-dashboard');
  } else {
    router.push('/dashboard');
  }
  
  Swal.fire({
    title: 'Login Successful',
    text: 'Welcome back!',
    icon: 'success',
    timer: 1500
  });
  
  isLoading.value = false;
};

onMounted(() => {
  setTimeout(() => {
    showDescription.value = true;
  }, 300);
  setTimeout(() => {
    showForm.value = true;
  }, 600);
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 2rem;
}

.description, .form-container {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.description {
  margin-right: 2rem;
}

.slide-in {
  opacity: 1;
  transform: translateY(0);
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}

h1, h2 {
  color: #007bff;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.register-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
}

.register-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .description {
    margin-right: 0;
    margin-bottom: 2rem;
  }
}
</style>
