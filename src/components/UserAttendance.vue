<template>
  <div class="user-attendance">
    <h1>Monthly Attendance</h1>
    <div class="month-selector">
      <button @click="previousMonth" :disabled="isLoading">&lt; Previous</button>
      <h2>{{ currentMonthYear }}</h2>
      <button @click="nextMonth" :disabled="isLoading">Next &gt;</button>
    </div>
    <div v-if="isLoading" class="loading">Loading...</div>
    <table v-else class="attendance-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Day</th>
          <th>Status</th>
          <th>Check-In</th>
          <th>Check-Out</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in daysInMonth" :key="day.date" :class="{ 'weekend': day.isWeekend }">
          <td>{{ day.date }}</td>
          <td>{{ day.dayName }}</td>
          <td :class="day.status.toLowerCase()">{{ day.status }}</td>
          <td>{{ day.checkIn || '-' }}</td>
          <td>{{ day.checkOut || '-' }}</td>
        </tr>
      </tbody>
    </table>
    <div class="summary">
      <p>Present: {{ presentDays }}</p>
      <p>Absent: {{ absentDays }}</p>
      <p>Weekends/Holidays: {{ weekendHolidays }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const currentDate = ref(new Date());
const attendanceData = ref([]);
const isLoading = ref(true);

const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const dayData = attendanceData.value.find(d => d.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    return {
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      isWeekend,
      status: dayData ? dayData.status : (isWeekend ? 'Weekend' : 'Absent'),
      checkIn: dayData ? dayData.checkIn : null,
      checkOut: dayData ? dayData.checkOut : null
    };
  });
});

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
});

const presentDays = computed(() => daysInMonth.value.filter(day => day.status === 'Present').length);
const absentDays = computed(() => daysInMonth.value.filter(day => day.status === 'Absent').length);
const weekendHolidays = computed(() => daysInMonth.value.filter(day => day.status === 'Weekend' || day.status === 'Holiday').length);

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
  fetchAttendanceData();
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
  fetchAttendanceData();
};

const fetchAttendanceData = async () => {
  isLoading.value = true;
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Generate mock data for the current month
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  attendanceData.value = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    if (isWeekend) return null;
    
    const present = Math.random() > 0.2;
    return present ? {
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
      status: 'Present',
      checkIn: `0${7 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      checkOut: `1${6 + Math.floor(Math.random() * 3)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
    } : null;
  }).filter(Boolean);
  
  isLoading.value = false;
};

onMounted(fetchAttendanceData);
</script>

<style scoped>
.user-attendance {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.month-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.month-selector button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.month-selector button:hover:not(:disabled) {
  background-color: #2980b9;
}

.month-selector button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  margin: 2rem 0;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.attendance-table th, .attendance-table td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: center;
}

.attendance-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.weekend {
  background-color: #f8f9fa;
}

.present {
  color: #27ae60;
}

.absent {
  color: #e74c3c;
}

.summary {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .attendance-table {
    font-size: 0.8rem;
  }
  
  .attendance-table th, .attendance-table td {
    padding: 0.3rem;
  }
}

body {
  background-image: url('@/assets/logo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
