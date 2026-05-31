import { ref, computed, watch } from "vue"
import employeesData from "../data/purple_cross_employees.json"

export function useEmployees() {
  const employees = ref(employeesData)

  const search = ref("")
  const departmentFilter = ref("")
  const sortField = ref("fullName")
  const sortDirection = ref("asc")
   const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const isFuture = (date) => {
    if (!date) return false
    return new Date(date) > new Date()
  }

  const sortBy = (field) => {
    if (sortField.value === field) {
      sortDirection.value =
        sortDirection.value === "asc" ? "desc" : "asc"
    } else {
      sortField.value = field
      sortDirection.value = "asc"
    }
  }
  //Pagination

const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value

  return processedEmployees.value.slice(start, end)
})

  const totalPages = computed(() => {
    return Math.ceil(
      processedEmployees.value.length /
      itemsPerPage.value
    )
  })

  const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

watch(search, () => {
  currentPage.value = 1
})

watch(sortField, () => {
  currentPage.value = 1
})

watch(sortDirection, () => {
  currentPage.value = 1
  })

//table system PipeLine
const processedEmployees = computed(() => {
  const query = (search.value || "").toLowerCase()

  let filtered = employees.value.filter(emp => {
    const matchesSearch =
      !query ||
      emp.fullName?.toLowerCase().includes(query) ||
      emp.code?.toLowerCase().includes(query) ||
      emp.department?.toLowerCase().includes(query) ||
      emp.occupation?.toLowerCase().includes(query)

    return matchesSearch 
  })

  return [...filtered].sort((a, b) => {
    let valueA = a[sortField.value] ?? ""
    let valueB = b[sortField.value] ?? ""

    valueA = valueA.toString().toLowerCase()
    valueB = valueB.toString().toLowerCase()

    return sortDirection.value === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA)
  })
})


//Modal Actions
  const addEmployee = (employee) => {
    employees.value.push(employee)
  }

  const deleteEmployee = (code) => {
    employees.value = employees.value.filter(
      (emp) => emp.code !== code
    )
  }

  const updateEmployee = (updatedEmployee) => {
  const index = employees.value.findIndex(
    emp => emp.code === updatedEmployee.code
  )

  if (index !== -1) {
    employees.value[index] = updatedEmployee
  }
}


  // Employment Date

  const getEmploymentStatus = (emp) => {
    if (!emp.dateOfEmployment) return ""

    if (isFuture(emp.dateOfEmployment)) {
      return "Employed soon"
    }

    return "Currently employed"
  }

  // Termination Date 

  const getTerminationStatus = (emp) => {
    if (!emp.terminationDate) return ""

    if (isFuture(emp.terminationDate)) {
      return "To be terminated"
    }

      return "Terminated"    
  }

  return {
    employees,
    paginatedEmployees,
    itemsPerPage,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    search,
    departmentFilter,
    sortField,
    sortDirection,
    sortBy,
    addEmployee,
    deleteEmployee,
    updateEmployee,
    getEmploymentStatus,
    getTerminationStatus
  }
}