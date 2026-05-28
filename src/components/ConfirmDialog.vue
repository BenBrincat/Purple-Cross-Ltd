<script setup>
defineProps(["employee"])
defineEmits(["confirm", "cancel"])
</script>

<template>
  <div class="modal">
    <p>Delete {{ employee.fullName }}?</p>

    <button>Yes</button>
    <button>No</button>
  </div>
</template>