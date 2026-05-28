<script setup>
import { ref } from "vue"
import { useEmployees } from "./composables/useEmployees"

import EmployeeTable from "./components/EmployeeTable.vue"
import EmployeeForm from "./components/EmployeeForm.vue"
import EmployeeFilters from "./components/EmployeeFilters.vue"
import ConfirmDialog from "./components/ConfirmDialog.vue"
import EmployeeModal from "./components/EmployeeModal.vue"

const {
  sortedEmployees,
  search,
  departmentFilter,
  getEmploymentStatus,
  getTerminationStatus,
  addEmployee,
  deleteEmployee
} = useEmployees()

const showForm = ref(false)
const employeeToDelete = ref(null)
const isSidebarOpen = ref(false);
const selectedEmployee = ref(null)
const modalMode = ref("") // "view" | "edit" | "delete"

const openModal = (mode, employee) => {
  selectedEmployee.value = employee
  modalMode.value = mode
}

const closeModal = () => {
  selectedEmployee.value = null
  modalMode.value = ""
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}

function closeSidebar() {
  isSidebarOpen.value = false;
}


</script>

<template>
  <div class="page">

    <nav class="navbar">
      <div class="nav-left">
        <h2>Purple Cross Ltd</h2>
      </div>

      <div class="nav-right">
        <button class="burger" @click="toggleSidebar">☰</button>
      </div>
    </nav>

    <div v-if="isSidebarOpen" class="overlay" @click="closeSidebar"></div>

    <aside class="sidebar" :class="{ open: isSidebarOpen }">
      <button class="close-btn" @click="closeSidebar">✕</button>

      <ul>
        <li>Employee Report</li>
      </ul>
    </aside>


    <EmployeeFilters
      v-model:search="search"
    />

    <EmployeeTable
    :employees="sortedEmployees"
    :getEmploymentStatus="getEmploymentStatus"
    :getTerminationStatus="getTerminationStatus"
    @view="openModal('view', $event)"
    @edit="openModal('edit', $event)"
    @delete="openModal('delete', $event)"
  />

    <button class="fab" @click="showForm = true">
      + Create Employee
    </button>

  <EmployeeModal
    v-if="selectedEmployee"
    :employee="selectedEmployee"
    :mode="modalMode"
    @close="closeModal"
    @save="addEmployee"
    @delete="deleteEmployee"
  />
  </div>
</template>

<style>
.page {
  padding: 20px;
  margin-top: 25px;
  font-family: Arial, sans-serif;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 20px;
  background: #111;
  color: white;
  z-index: 1000;
}

/* prevent content overlap */
.content {
  padding-top: 60px;
}

/* Burger */
.burger {
  font-size: 26px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0,0,0,0.5);
  z-index: 1500;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  right: -260px;
  width: 260px;
  height: 100%;

  background: #1c1c1c;
  color: white;
  padding: 20px;

  transition: right 0.3s ease;
  z-index: 2000;
}

.sidebar.open {
  right: 0;
}

/* Close button */
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

/* Menu items */
.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 12px 0;
  cursor: pointer;
}

.sidebar li:hover {
  opacity: 0.7;
}
.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 14px 18px;
  border-radius: 50px;
  background: #42b883;
  color: white;
  border: none;
  cursor: pointer;
}

th {
  font-weight: 600;
}

</style>