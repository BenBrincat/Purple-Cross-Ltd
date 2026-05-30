<script setup>
import { reactive, ref } from "vue"

const emit = defineEmits(["save", "close"])

const employee = reactive({
  code: "",
  fullName: "",
  occupation: "",
  department: "",
  dateOfEmployment: "",
  terminationDate: null
})

const props = defineProps({
  existingCodes: {
    type: Array,
    default: () => []
  }
})

const errors = ref({})

const validate = () => {
  const newErrors = {}

  if (!employee.code.trim()) {
    newErrors.code = "Employee Code is required"
  } else if (
    props.existingCodes.some(
      code =>
        code.toLowerCase() === employee.code.trim().toLowerCase()
    )
  ) {
    newErrors.code = "Employee Code must be unique"
  }

  if (!employee.fullName.trim()) {
    newErrors.fullName = "Full Name is required"
  }

  if (!employee.occupation.trim()) {
    newErrors.occupation = "Occupation is required"
  }

  if (!employee.department.trim()) {
    newErrors.department = "Department is required"
  }

  errors.value = newErrors

  return Object.keys(newErrors).length === 0
}


const saveEmployee = () => {
  if (!validate()) return

  emit("save", { ...employee })
  emit("close")
}
</script>


<template>
  <div class="overlay">
    <div class="modal">
      <h2 class="ModalName">Create Employee</h2>

     <label class="inputLabel">Employee Code *</label>
    <input v-model="employee.code" />
    <span v-if="errors.code" class="error">
    {{ errors.code }}
    </span>

    <label class="inputLabel">Full Name *</label>
    <input v-model="employee.fullName" />
    <span v-if="errors.fullName" class="error">
      {{ errors.fullName }}
    </span>

    <label class="inputLabel">Occupation *</label>
    <input v-model="employee.occupation" />
    <span v-if="errors.occupation" class="error">
      {{ errors.occupation }}
    </span>

    <label class="inputLabel">Department *</label>
    <input v-model="employee.department" />
    <span v-if="errors.department" class="error">
      {{ errors.department }}
    </span>

    <label class="inputLabel">Date of Employment</label>
    <input
      v-model="employee.dateOfEmployment"
      type="date"
    />

    <label class="inputLabel">Termination Date</label>
    <input
      v-model="employee.terminationDate"
      type="date"
    />

    <div class="modal-footer">
      <button class="btn-cancel" @click="$emit('close')">
        Cancel
      </button>

      <button class="btn-save" @click="saveEmployee">
        Save
      </button>
    </div>
</div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 12px;
}

input {
  width: 100%;
  margin-bottom: 6px;
}

.inputLabel {
  width: 300px;
  color: gray;
}
</style>