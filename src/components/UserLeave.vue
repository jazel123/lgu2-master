<template>
  <div class="background">
    <div class="user-leave">
      <h1>Leave Management</h1>
      
      <div class="leave-balance">
        <h2>Leave Balance</h2>
        <div class="balance-grid">
          <div v-for="(balance, type) in leaveBalance" :key="type" class="balance-item">
            <h3>{{ type }}</h3>
            <p>{{ balance }} day(s)</p>
          </div>
        </div>
      </div>

      <div class="leave-history">
        <h2>Leave History</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Duration</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="leave in leaveHistory" :key="leave.id">
              <td>{{ leave.type }}</td>
              <td>{{ formatDate(leave.startDate) }}</td>
              <td>{{ formatDate(leave.endDate) }}</td>
              <td>{{ leave.duration }} day(s)</td>
              <td :class="leave.status.toLowerCase()">{{ leave.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const leaveBalance = ref({
  'Vacation Leave': 15,
  'Mandatory Leave': 5,
  'Sick Leave': 15,
  'Maternity Leave': 105,
  'Paternity Leave': 7,
  'Special Privilege Leave': 3,
  'Solo Parent Leave': 7,
  'Study Leave': 0,
  'VAWC Leave': 10,
  'Rehabilitation Leave': 0,
  'Special Leave Benefits for Women': 60,
  'Special Emergency (Calamity) Leave': 5,
  'Monetization of Leave Credits': 0,
  'Terminal Leave': 0,
  'Adoption Leave': 60
});

const leaveHistory = ref([]);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(async () => {
  // Simulate fetching leave history from API
  await new Promise(resolve => setTimeout(resolve, 500));
  leaveHistory.value = [
    { id: 1, type: 'Vacation Leave', startDate: '2023-06-01', endDate: '2023-06-05', duration: 5, status: 'Approved' },
    { id: 2, type: 'Sick Leave', startDate: '2023-04-15', endDate: '2023-04-16', duration: 2, status: 'Approved' },
    { id: 3, type: 'Special Privilege Leave', startDate: '2023-03-10', endDate: '2023-03-10', duration: 1, status: 'Approved' },
    { id: 4, type: 'Vacation Leave', startDate: '2023-07-20', endDate: '2023-07-25', duration: 6, status: 'Pending' },
    { id: 5, type: 'Mandatory Leave', startDate: '2023-12-26', endDate: '2023-12-30', duration: 5, status: 'Approved' },
  ];
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

.user-leave {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

h1, h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.leave-balance {
  margin-bottom: 2rem;
}

.balance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.balance-item {
  background-color: rgba(248, 249, 250, 0.8);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.balance-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.balance-item h3 {
  margin: 0;
  font-size: 0.9rem;
  color: #34495e;
}

.balance-item p {
  margin: 0.5rem 0 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #3498db;
}

.leave-history {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid rgba(221, 221, 221, 0.5);
}

th {
  background-color: rgba(248, 249, 250, 0.8);
  font-weight: bold;
  color: #34495e;
}

.approved {
  color: #27ae60;
}

.rejected {
  color: #e74c3c;
}

.pending {
  color: #f39c12;
}

@media (max-width: 768px) {
  .background {
    padding: 1rem;
  }

  .user-leave {
    padding: 1rem;
  }

  .balance-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
