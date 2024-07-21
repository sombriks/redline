export const requiredRule = (message = 'Required field') => (value) => {
  return !!value || message
}

export const lengthRule = (n, msg = `Minimum ${n} required`) => (value) => {
  return value.length >= n || msg
}

const dayOfMonth = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31
]

export const dayOfMonthRule = (value) => {
  return dayOfMonth.includes(parseInt(value)) || 'Must provide a valid day'
}

export const numberRule = (value) => {
  return !isNaN(value) || "Provide a valid number"
}

export const minValueRule = min => value => {
  return parseInt(value) >= parseInt(min) || `Value smaller than ${min}`
}

export const minSizeRule = min => value => {
  return parseInt(value.length) >= parseInt(min) || `Must have size of at least ${min}`
}
