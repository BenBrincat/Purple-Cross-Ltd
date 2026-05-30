<script setup>
import { reactive, ref, watch } from "vue"

const errors = ref({})

const props = defineProps({
  employee: Object,
  mode: String,
  existingCodes: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(["close", "save", "delete"])

const form = reactive({
  code: "",
  fullName: "",
  occupation: "",
  department: "",
  dateOfEmployment: "",
  terminationDate: ""
})

watch(
  () => props.employee,
  (emp) => {
    if (!emp) return

    form.code = emp.code
    form.fullName = emp.fullName
    form.occupation = emp.occupation
    form.department = emp.department

    form.dateOfEmployment = emp.dateOfEmployment || ""
    form.terminationDate = emp.terminationDate || ""
  },
  { immediate: true }
)

const save = () => {
  if (!validate()) return

  emit("save", {
    ...props.employee,
    ...form
  })

  emit("close")
}

const validate = () => {
  const newErrors = {}

  // Code validation
  if (!form.code?.trim()) {
    newErrors.code = "Employee Code is required"
  } else {
    const duplicateCode = props.existingCodes.some(
      code =>
        code.toLowerCase() === form.code.trim().toLowerCase() &&
        code.toLowerCase() !== props.employee.code.toLowerCase()
    )

    if (duplicateCode) {
      newErrors.code = "Employee Code must be unique"
    }
  }

  // Full Name
  if (!form.fullName?.trim()) {
    newErrors.fullName = "Full Name is required"
  }

  // Occupation
  if (!form.occupation?.trim()) {
    newErrors.occupation = "Occupation is required"
  }

  // Department
  if (!form.department?.trim()) {
    newErrors.department = "Department is required"
  }

  errors.value = newErrors

  return Object.keys(newErrors).length === 0
}

const remove = () => {
  emit("delete", props.employee.code)
  emit("close")
}
</script>

<template>
  <div class="overlay">
    <div class="modal">

      <h2 class="ModalName">
        {{ mode === "view" ? "View Employee" :
           mode === "edit" ? "Edit Employee" :
           "Delete Employee" }}
      </h2>

      <!-- VIEW -->
      <div v-if="mode === 'view'">
        <p><b>Code:</b> {{ employee.code }}</p>
        <p><b>Name:</b> {{ employee.fullName }}</p>
        <p><b>Occupation:</b> {{ employee.occupation }}</p>
        <p><b>Department:</b> {{ employee.department }}</p>
        <p><b>Date of Employment:</b> {{ employee.dateOfEmployment }}</p>
        <p><b>Date of Termination:</b> {{ employee.terminationDate }}</p>

      </div>

      <!-- EDIT -->
      <div v-if="mode === 'edit'">
        <label>Employee Code</label>
        <input v-model="form.code" />
        <span v-if="errors.code" class="error">
        {{ errors.code }}
        </span>

        <label>Full Name</label>
        <input v-model="form.fullName" />
        <span v-if="errors.fullName" class="error">
        {{ errors.fullName }}
        </span>

        <label>Occupation</label>
        <input v-model="form.occupation" />
        <span v-if="errors.occupation" class="error">
        {{ errors.occupation }}
        </span>

        <label>Department</label>
        <input v-model="form.department" />
        <span v-if="errors.department" class="error">
            {{ errors.department }}
        </span>

        <label class="inputLabel">Date of Employment</label>
        <input v-model="form.dateOfEmployment" type="date"/>

    <label class="inputLabel">Termination Date</label>
    <input
      v-model="form.terminationDate"
      type="date"
    />
      </div>

      <!-- DELETE -->
      <div v-if="mode === 'delete'">
        <p>Are you sure you want to delete {{ employee.fullName }}?</p>
      </div>

        <!-- Normal Actions -->
      <div class="modal-footer">
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

b {
    font-weight: 600;
    }
</style>