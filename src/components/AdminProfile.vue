<template>
  <div class="admin-profile">
    <h1>Admin Profile</h1>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="profile.name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="profile.email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="profile.password" type="password" id="password" />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>
