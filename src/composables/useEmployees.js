import { ref, computed } from "vue"
import employeesData from "../data/employees.json"

export function useEmployees() {
  const employees = ref(employeesData)

  const search = ref("")
  const departmentFilter = ref("")

  const isFuture = (date) => {
    if (!date) return false
    return new Date(date) > new Date()
  }

  const isPast = (date) => {
    if (!date) return false
    return new Date(date) < new Date()
  }

  const sortedEmployees = computed(() => {
    const query = (search.value || "").toLowerCase()

    return employees.value.filter((emp) => {
      const matchesSearch =
        !query ||
        emp.fullName?.toLowerCase().includes(query) ||
        emp.code?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query) ||
        emp.occupation?.toLowerCase().includes(query)

      const matchesDepartment =
        !departmentFilter.value ||
        emp.department === departmentFilter.value

      return matchesSearch && matchesDepartment
    })
  })

  const addEmployee = (employee) => {
    employees.value.push(employee)
  }

  const deleteEmployee = (code) => {
    employees.value = employees.value.filter(
      (emp) => emp.code !== code
    )
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

    if (isPast(emp.terminationDate)) {
      return "Terminated"
    }

    return ""
  }

  return {
    employees,
    sortedEmployees,
    search,
    departmentFilter,
    addEmployee,
    deleteEmployee,
    getEmploymentStatus,
    getTerminationStatus
  }
}