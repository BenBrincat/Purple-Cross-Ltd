<script setup>
import { ref } from "vue"
import { useEmployees } from "./composables/useEmployees"

import EmployeeTable from "./components/EmployeeTable.vue"
import EmployeeFilters from "./components/EmployeeFilters.vue"
import EmployeeModal from "./components/EmployeeModal.vue"
import CreateEmployeeModal from "./components/CreateEmployeeModal.vue"

const {
   paginatedEmployees,
  currentPage,
  itemsPerPage,
  totalPages,
  nextPage,
  previousPage,
  search,
  employees,
  departmentFilter,
  getEmploymentStatus,
  getTerminationStatus,
  updateEmployee,
  deleteEmployee,
  addEmployee,
  sortField,
  sortDirection,
  sortBy
} = useEmployees()

const showForm = ref(false)
const employeeToDelete = ref(null)
const isSidebarOpen = ref(false);
const selectedEmployee = ref(null)
const modalMode = ref("") // "view" | "edit" | "delete"
const showCreateModal = ref(false)

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

const loading = ref(false)

const changePage = (callback) => {
  loading.value = true

  setTimeout(() => {
    callback()
    loading.value = false
  }, 200)
}

//Export & Import
const exportJSON = () => {
  const data = JSON.stringify(employees.value, null, 2)

  const blob = new Blob([data], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "employees.json"
  a.click()

  URL.revokeObjectURL(url)
}

const fileInput = ref(null)

const triggerImport = () => {
  fileInput.value.click()
}

const handleImport = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result)

      if (Array.isArray(parsed)) {
        employees.value = parsed
      }
    } catch (err) {
      alert("Invalid file format")
    }
  }

  reader.readAsText(file)
}

</script>

<template>
  <div class="page">

    <nav class="navbar">
      <div class="nav-left">
        <h2 class="navTitle">Purple Cross Ltd</h2>
      </div>

      <div class="nav-right">
        <button class="burger" @click="toggleSidebar">☰</button>
      </div>
    </nav>

    <input ref="fileInput" type="file" accept=".json" @change="handleImport" style="display: none"/>

    <div v-if="isSidebarOpen" class="overlay" @click="closeSidebar"></div>

    <aside class="sidebar" :class="{ open: isSidebarOpen }">
      <button class="close-btn" @click="closeSidebar">✕</button>

      <ul>
        <li>
          <button class="sidebar-btn" @click="exportJSON">
            Export Employee Table
          </button>
        </li>

        <li>
          <button class="sidebar-btn" @click="triggerImport">
            Import Employee Information
          </button>
        </li>
      </ul>
    </aside>

<div class="page-container">
  <div class="table-wrapper">

  <EmployeeFilters
      v-model:search="search"
    />

    <EmployeeTable
      :employees="paginatedEmployees"
      :sortField="sortField"
      :sortDirection="sortDirection"
      :getEmploymentStatus="getEmploymentStatus"
      :getTerminationStatus="getTerminationStatus"
      @sort="sortBy"
      @view="openModal('view', $event)"
      @edit="openModal('edit', $event)"
      @delete="openModal('delete', $event)"
    />
  </div>

  <div class="pagination">
    <button @click="previousPage" :disabled="currentPage === 1">
      ← Previous
    </button>

    <span class="paginationTitle">
      Page {{ currentPage }} of {{ totalPages }}
    </span>

    <button @click="nextPage" :disabled="currentPage === totalPages">
      Next →
    </button>
  </div>
</div>

  <EmployeeModal
    v-if="selectedEmployee"
    :employee="selectedEmployee"
    :mode="modalMode"
    :existing-codes="employees.map(emp => emp.code)"
    @close="closeModal"
    @save="updateEmployee"
    @delete="deleteEmployee"
  />

    <button class="fab" @click="showCreateModal = true">
      + Create Employee
    </button>

    <CreateEmployeeModal
  v-if="showCreateModal"
  :existing-codes="employees.map(emp => emp.code)"
  @close="showCreateModal = false"
  @save="addEmployee"
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
  background: #42b883;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 20px;
  color: white;
  z-index: 1000;
}

/* prevent content overlap */
.content {
  padding-top: 60px;
}

/* Burger Icon*/
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

  background: #42b883;
  color: white;
  padding: 20px;

  transition: right 0.3s ease;
  z-index: 2000;
}

.sidebar.open {
  right: 0;
}

.sidebar-btn {
  width: 100%;
  padding: 10px;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: white;
}

.sidebar-btn:hover {
  background: rgba(0,0,0,0.05);
  border-radius: 6px;
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