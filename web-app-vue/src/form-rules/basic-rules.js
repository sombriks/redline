export const requiredRule = (value) => {
  return !!value || 'Required field'
}

const dayOfMonth = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31
]

export const dayOfMonthRule = (value) => {
  return dayOfMonth.includes(parseInt(value)) || 'Must provide a valid day'
}

export const numberRule = (value) => {
  return !value || !isNaN(value) || "Provide a valid number"
}
