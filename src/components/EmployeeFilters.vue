<script setup>
import { computed } from "vue"

const props = defineProps({
  search: String
})

const emit = defineEmits(["update:search"])

const searchModel = computed({
  get: () => props.search,
  set: (val) => emit("update:search", val)
})
</script>

<template>
  <div class="filters">
    <input
      v-model="searchModel"
      placeholder="Search ..."
      class="input"
    />
  </div>
</template>



<style scoped>
.filters {
  display: flex;
  margin-bottom: 15px;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  outline: none;
  font-size: 14px;
}

.input:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}
</style>