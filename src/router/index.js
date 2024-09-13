import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '@/components/UserLogin.vue';
import UserRegister from '@/components/UserRegister.vue';
import UserProfile from '@/components/UserProfile.vue';
import UserLeave from '@/components/UserLeave.vue';
import UserAttendance from '@/components/UserAttendance.vue';
import RequestLeave from '@/components/RequestLeave.vue';
import UserLogout from '@/components/UserLogout.vue';
import UserDashboard from '@/components/UserDashboard.vue'; 
import AdminDashboard from '@/components/AdminDashboard';
import AdminUser from '@/components/AdminUser';
import AdminProfile from '@/components/AdminProfile';

const routes = [
  { path: '/', component: UserLogin },
  { path: '/register', component: UserRegister },
  { path: '/profile', component: UserProfile },
  { path: '/leave', component: UserLeave },
  { path: '/attendance', component: UserAttendance },
  { path: '/request-leave', component: RequestLeave },
  { path: '/logout', component: UserLogout },
  { path: '/dashboard', component: UserDashboard }, // Updated name
  { path: '/admin-dashboard', component: AdminDashboard },
  { path: '/admin-user', component: AdminUser},
  { path: '/admin-profile', component: AdminProfile},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
