<template>
  <div class="logout-container">
    <p>You have been logged out.</p>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'UserLogout',
  created() {
    this.handleLogout();
  },
  methods: {
    handleLogout() {
      // Clear any stored authentication tokens or user data
      // localStorage.removeItem('authToken');
      // this.$store.commit('setUser', null); // If using Vuex

      // Show SweetAlert confirmation
      Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000, // Auto close after 3 seconds
      }).then(() => {
        // Redirect to the login page after confirmation
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped>
.logout-container {
  padding: 2rem;
  text-align: center;
}

p {
  font-size: 1rem;
  color: #333;
}
</style>
