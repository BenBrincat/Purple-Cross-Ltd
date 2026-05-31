<script setup>

defineProps({
  employees: Array,
  sortField: String,
  sortDirection: String,
  getEmploymentStatus: Function,
  getTerminationStatus: Function
})

defineEmits([
  "view",
  "edit",
  "delete",
  "sort"
])

</script>

<template>
  <table>
    <thead>
      <tr>
        <th @click="$emit('sort', 'fullName')">
      Name {{ sortField === 'fullName' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}
    </th>

    <th @click="$emit('sort', 'occupation')">
      Occupation {{ sortField === 'occupation' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}
    </th>

    <th @click="$emit('sort', 'department')">
      Department {{ sortField === 'department' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}
    </th>

    <th @click="$emit('sort', 'dateOfEmployment')">
      Employment {{ sortField === 'dateOfEmployment' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}
    </th>

    <th @click="$emit('sort', 'terminationDate')">
      Termination {{ sortField === 'terminationDate' ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}
    </th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="emp in employees" :key="emp.code">
        <td>{{ emp.fullName }}</td>
        <td>{{ emp.occupation }}</td>
        <td>{{ emp.department }}</td>

        <td>{{ getEmploymentStatus(emp) }}</td>
        <td>{{ getTerminationStatus(emp) }}</td>

       <td>
            <button @click="$emit('view', emp)">View</button>
            <button @click="$emit('edit', emp)">Edit</button>
            <button @click="$emit('delete', emp)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

thead {
  background: #42b883;
  color: white;
}

th {
  text-align: left;
  padding: 14px 12px;
  font-size: 14px;
  letter-spacing: 0.5px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s;
}

td {
  padding: 12px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: gray;
}

tbody tr:hover {
  background: #f5f9f7;
  transition: 0.2s ease;
}

button {
  margin-right: 6px;
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s ease;
}

/* View button*/
button:nth-child(1) {
  background: #e0f2ff;
  color: #0077cc;
}

/* Edit Button*/
button:nth-child(2) {
  background: #fff4d6;
  color: #b26a00;
}

/* Delete Button*/
button:nth-child(3) {
  background: #ffe5e5;
  color: #cc0000;
}

button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  table {
    font-size: 12px;
  }

  th, td {
    padding: 10px;
  }

  button {
    padding: 5px 8px;
    font-size: 11px;
  }
}
</style>