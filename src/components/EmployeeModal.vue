<template>
  <div class="overlay">
    <div class="modal">

      <h2 style="border-bottom: 1px solid lightgray; margin-bottom: 7px;">
        {{ mode === "view" ? "View Employee" :
           mode === "edit" ? "Edit Employee" :
           "Delete Employee" }}
      </h2>

      <!-- VIEW -->
      <div v-if="mode === 'view'">
        <p><b>Name:</b> {{ employee.fullName }}</p>
        <p><b>Occupation:</b> {{ employee.occupation }}</p>
        <p><b>Department:</b> {{ employee.department }}</p>
      </div>

      <!-- EDIT -->
      <div v-if="mode === 'edit'">
        <input v-model="form.fullName" />
        <input v-model="form.occupation" />
        <input v-model="form.department" />
      </div>

      <!-- DELETE -->
      <div v-if="mode === 'delete'">
        <p>Are you sure you want to delete {{ employee.fullName }}?</p>
      </div>

        <!-- Normal Actions -->
      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">Cancel</button>

        <button class="btn-save" v-if="mode === 'edit'" @click="save">
          Save
        </button>

        <button class="btn-delete" v-if="mode === 'delete'" @click="remove">
          Delete
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue"

const props = defineProps({
  employee: Object,
  mode: String
})

const emit = defineEmits(["close", "save", "delete"])

const form = reactive({
  fullName: "",
  occupation: "",
  department: ""
})

watch(
  () => props.employee,
  (emp) => {
    if (emp) {
      form.fullName = emp.fullName
      form.occupation = emp.occupation
      form.department = emp.department
    }
  },
  { immediate: true }
)

const save = () => {
  emit("save", { ...props.employee, ...form })
  emit("close")
}

const remove = () => {
  emit("delete", props.employee.code)
  emit("close")
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  color: gray;
}

.actions {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.btn-save {
  background: linear-gradient(135deg, #4ade80, #22c55e);
  color: white;
  border: none;
      padding: 5px;
    border-radius: 5px;
}

.btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(34, 197, 94, 0.25);
}

.btn-cancel {
    background: #f3f4f6;
  color: #374151;
  border: none;
      padding: 5px;
    border-radius: 5px;
}

.btn-cancel:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.btn-delete {
  background: #ef4444;
  color: white;
  border: none;
    padding: 5px;
    border-radius: 5px;
}

.btn-delete:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(220, 38, 38, 0.25);
}

b {
    font-weight: 600;
    }
</style>