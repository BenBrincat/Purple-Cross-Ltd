<template>
  <div class="filters">
    <input v-model="search" placeholder="Search employees..." />
    
    <select v-model="department">
      <option value="">All Departments</option>
      <option value="HR">HR</option>
      <option value="IT">IT</option>
    </select>
  </div>
</template>

<script setup>

</script>