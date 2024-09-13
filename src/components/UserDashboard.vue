<template>
  <div class="home-container">
    <aside class="sidebar">
      <div class="logo">
        <img src="@/assets/logo.png" alt="LGU Cordova Logo" />
        <h2>LGU Cordova</h2>
      </div>
      <nav>
        <router-link to="/profile" class="nav-item">
          <i class="fas fa-user"></i> Profile
        </router-link>
        <router-link to="/leave" class="nav-item">
          <i class="fas fa-calendar-minus"></i> Leave
        </router-link>
        <router-link to="/request-leave" class="nav-item">
          <i class="fas fa-calendar-plus"></i> Request Leave
        </router-link>
        <router-link to="/attendance" class="nav-item">
          <i class="fas fa-clock"></i> Attendance
        </router-link>
      </nav>
      <button @click="handleLogout" class="logout-button">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </aside>
    <main class="main-content">
      <header class="dashboard-header">
        <div>
          <h1>Welcome, {{ userName }}!</h1>
          <p class="system-description">
            {{ systemDescription }}
          </p>
        </div>
        <div class="user-info">
          <div class="notification-bell" @click="toggleNotifications">
            <i class="fas fa-bell"></i>
            <span v-if="unreadNotifications" class="notification-badge">{{ unreadNotifications }}</span>
          </div>
          <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
          <span>{{ userRole }}</span>
        </div>
      </header>
      <div class="dashboard-container">
        <section class="calendar-section">
          <h2>Upcoming Events</h2>
          <div class="calendar-container" :class="{ 'loading': isLoading }">
            <FullCalendar :options="calendarOptions" />
            <div v-if="isLoading" class="loading-overlay">
              <div class="loading-spinner"></div>
            </div>
          </div>
          <p v-if="error" class="error-message">{{ error }}</p>
          <div class="legend">
            <div class="legend-item">
              <span class="color-box event"></span> Event
            </div>
            <div class="legend-item">
              <span class="color-box birthday"></span> Birthday
            </div>
            <div class="legend-item">
              <span class="color-box holiday"></span> Holiday
            </div>
          </div>
        </section>
      </div>
    </main>
    <!-- Notification dropdown -->
    <div v-if="showNotifications" class="notification-dropdown">
      <h3>Notifications</h3>
      <ul v-if="notifications.length">
        <li v-for="notification in notifications" :key="notification.id" class="notification-item">
          {{ notification.message }}
        </li>
      </ul>
      <p v-else>No new notifications</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const router = useRouter();
const events = ref([]);
const currentDate = ref(new Date());
const isLoading = ref(false);
const error = ref(null);

// Mock user data
const userName = ref('John Doe');
const userRole = ref('Employee');
const userAvatar = ref('https://i.pravatar.cc/150?img=68');

// System description
const systemDescription = ref('Welcome to the LGU Cordova Attendance and Leave Tracker. This system helps you manage your attendance, leave requests, and provides an overview of important dates and events.');

// New refs for notifications
const unreadNotifications = ref(3); // Example: 3 unread notifications
const showNotifications = ref(false);
const notifications = ref([
  { id: 1, message: 'New leave request approved' },
  { id: 2, message: 'Reminder: Team meeting at 2 PM' },
  { id: 3, message: 'Your attendance report is ready' },
]);

const handleLogout = () => {
  // Handle logout logic, e.g., clear authentication tokens
  router.push('/');
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    unreadNotifications.value = 0; // Mark as read when opened
  }
};

const fetchEvents = async (start, end) => {
  isLoading.value = true;
  error.value = null;

  try {
    const response = await axios.get('/api/events', {
      params: {
        start: start.toISOString(),
        end: end.toISOString()
      }
    });

    events.value = response.data.map(event => ({
      ...event,
      start: new Date(event.start),
      end: event.end ? new Date(event.end) : null
    }));
  } catch (err) {
    console.error('Error fetching events:', err);
    error.value = 'Failed to load events. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  events: events.value,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  },
  eventContent: (arg) => {
    return {
      html: `<div class="fc-event-main-frame">
               <div class="fc-event-title-container">
                 <div class="fc-event-title fc-sticky">${arg.event.title}</div>
               </div>
             </div>`
    }
  },
  eventClassNames: (arg) => {
    return [`fc-event-${arg.event.extendedProps.type}`]
  },
  datesSet: (dateInfo) => {
    currentDate.value = dateInfo.start;
    fetchEvents(dateInfo.start, dateInfo.end);
  },
  loading: (isLoading) => {
    // You can add loading indicator logic here if needed
  }
}));

onMounted(() => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  fetchEvents(monthStart, monthEnd);
});
</script>

<style scoped>
.home-container {
  display: flex;
  min-height: 100vh;
  background-image: url('@/assets/logo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.logo img {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.logo h2 {
  font-size: 1.2rem;
  font-weight: 600;
}

nav {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.nav-item:hover, .nav-item.router-link-active {
  background-color: #34495e;
}

.nav-item i {
  margin-right: 0.5rem;
}

.logout-button {
  margin-top: auto;
  width: 100%;
  padding: 0.75rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.system-description {
  max-width: 600px;
  margin-top: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  line-height: 1.4;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
}

.dashboard-container {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

.calendar-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-container {
  height: 600px;
  margin-bottom: 1rem;
  position: relative;
}

.legend {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.color-box {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
  border-radius: 4px;
}

.color-box.event { background-color: #3498db; }
.color-box.birthday { background-color: #e74c3c; }
.color-box.holiday { background-color: #2ecc71; }

:deep(.fc-event-event) { background-color: #3498db; border-color: #3498db; }
:deep(.fc-event-birthday) { background-color: #e74c3c; border-color: #e74c3c; }
:deep(.fc-event-holiday) { background-color: #2ecc71; border-color: #2ecc71; }
:deep(.fc-day-today) { background-color: #f1f8ff !important; }
:deep(.fc-button-primary) { background-color: #3498db; border-color: #3498db; }
:deep(.fc-button-primary:not(:disabled):active),
:deep(.fc-button-primary:not(:disabled).fc-button-active) {
  background-color: #2980b9;
  border-color: #2980b9;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 1rem;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.notification-bell {
  position: relative;
  margin-right: 1rem;
  cursor: pointer;
}

.notification-bell i {
  font-size: 1.2rem;
  color: #34495e;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
}

.notification-dropdown {
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 300px;
  z-index: 1000;
}

.notification-dropdown h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.notification-dropdown ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notification-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.notification-item:last-child {
  border-bottom: none;
}

/* Ensure the notification bell doesn't push other elements down */
.dashboard-header {
  align-items: flex-start;
}
</style>
