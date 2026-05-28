<script setup>
import { ref } from "vue"
import { useEmployees } from "./composables/useEmployees"

import EmployeeTable from "./components/EmployeeTable.vue"
import EmployeeForm from "./components/EmployeeForm.vue"
import EmployeeFilters from "./components/EmployeeFilters.vue"
import ConfirmDialog from "./components/ConfirmDialog.vue"

// composable (state + logic)
const {
  sortedEmployees,
  search,
  departmentFilter,
  getEmploymentStatus,
  getTerminationStatus,
  addEmployee,
  deleteEmployee
} = useEmployees()

// UI state
const showForm = ref(false)
const employeeToDelete = ref(null)
</script>

<template>
  <div class="page">
    <h1>Employee Dashboard</h1>

    <EmployeeFilters
      v-model:search="search"
      v-model:department="departmentFilter"
    />

    <EmployeeTable
      :employees="sortedEmployees"
      :getEmploymentStatus="getEmploymentStatus"
      :getTerminationStatus="getTerminationStatus"
      @delete="employeeToDelete = $event"
    />

    <button class="fab" @click="showForm = true">
      + Create Employee
    </button>
    
  </div>
</template>

<style>
.page {
  padding: 20px;
  font-family: Arial, sans-serif;
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
</style>