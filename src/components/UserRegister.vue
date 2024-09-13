<template>
  <div class="container">
    <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>
        <div class="form-group">
          <label for="middleName">Middle Name:</label>
          <input type="text" id="middleName" v-model="middleName" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>
        <div class="form-group">
          <label for="birthdate">Birthdate:</label>
          <input type="date" id="birthdate" v-model="birthdate" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      birthdate: '',
      email: '',
      password: '',
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission logic
      Swal.fire({
        title: 'Registration Successful',
        text: 'Your account has been created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Optionally, redirect or reset form here
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.birthdate = '';
        this.email = '';
        this.password = '';
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.form-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

h2 {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
