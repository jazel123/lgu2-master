<template>
  <div class="background">
    <div class="user-profile">
      <div class="profile-header">
        <div class="profile-picture" @click="triggerFileInput">
          <img :src="profilePicture" alt="Profile Picture" />
          <div class="overlay">
            <span>Change Picture</span>
          </div>
        </div>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="image/*"
          style="display: none"
        />
        <h1>{{ profile.lastName }}, {{ profile.firstName }}</h1>
        <p class="job-title">{{ profile.position }} at {{ profile.department }}</p>
      </div>
      <form @submit.prevent="updateProfile" class="profile-form">
        <div class="form-section">
          <h2>Personal Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input v-model="profile.firstName" type="text" id="firstName" required />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input v-model="profile.lastName" type="text" id="lastName" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="employeeNo">Employee No.</label>
              <input v-model="profile.employeeNo" type="text" id="employeeNo" required />
            </div>
            <div class="form-group">
              <label for="gender">Gender</label>
              <select v-model="profile.gender" id="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="age">Age</label>
              <input v-model="profile.age" type="number" id="age" required />
            </div>
            <div class="form-group">
              <label for="birthDate">Birth Date</label>
              <input v-model="profile.birthDate" type="date" id="birthDate" required />
            </div>
          </div>
          <div class="form-group">
            <label for="civilStatus">Civil Status</label>
            <select v-model="profile.civilStatus" id="civilStatus" required>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>
        <div class="form-section">
          <h2>Contact Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label for="contactNo">Contact No.</label>
              <input v-model="profile.contactNo" type="tel" id="contactNo" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input v-model="profile.email" type="email" id="email" required />
            </div>
          </div>
        </div>
        <div class="form-section">
          <h2>Employment Information</h2>
          <div class="form-row">
            <div class="form-group">
              <label for="department">Department</label>
              <input v-model="profile.department" type="text" id="department" required />
            </div>
            <div class="form-group">
              <label for="position">Position</label>
              <input v-model="profile.position" type="text" id="position" required />
            </div>
          </div>
        </div>
        <button type="submit" :disabled="isLoading" class="submit-button">
          <span v-if="!isLoading">Update Profile</span>
          <span v-else class="loader"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

const profile = ref({
  firstName: 'Edsel A',
  lastName: 'Pateno',
  employeeNo: '230999727',
  gender: 'Male',
  age: 23,
  birthDate: '2000-09-16',
  contactNo: '09065342798',
  email: 'edselpateno16@gmail.com',
  department: 'Accounting',
  position: 'DTR in charge',
  civilStatus: 'Single',
});

const isLoading = ref(false);
const profilePicture = ref('https://via.placeholder.com/150');
const fileInput = ref(null);

const updateProfile = async () => {
  isLoading.value = true;
  // Simulating API call to update user profile
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  Swal.fire({
    title: 'Profile Updated',
    text: 'Your profile has been successfully updated!',
    icon: 'success',
    confirmButtonText: 'OK',
  });
  
  isLoading.value = false;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profilePicture.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

onMounted(() => {
  // If you need to fetch the profile data from an API, you can do it here
  // For now, we're using the data provided in the profile ref
});
</script>

<style scoped>
.background {
  min-height: 100vh;
  background-image: url('@/assets/logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.background::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.user-profile {
  max-width: 800px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.profile-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}

.profile-picture {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-picture .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.profile-picture:hover .overlay {
  opacity: 1;
}

.profile-picture .overlay span {
  color: white;
  font-size: 0.9rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

h2 {
  color: #3498db;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.job-title {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #34495e;
}

input, select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.submit-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.submit-button:hover:not(:disabled) {
  background-color: #2980b9;
}

.submit-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.loader {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .background {
    padding: 1rem;
  }

  .user-profile {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
  }
}
</style>
