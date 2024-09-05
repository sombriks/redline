export const requiredRule = (message = 'Required field') => (value) => {
  return !!value || message
}

export const lengthRule = (n, message = `Minimum ${n} required`) => (value) => {
  return value.length >= n || message
}

const dayOfMonth = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31
]

export const dayOfMonthRule = (message = 'Must provide a valid day') => (value) => {
  return dayOfMonth.includes(parseInt(value)) || message
}

export const numberRule = (message = 'Provide a valid number') => (value) => {
  return !isNaN(value) || message
}

export const minValueRule = (min, message = `Value smaller than ${min}`) => value => {
  return parseInt(value) >= parseInt(min) || message
}

export const minSizeRule = (min, message = `Must have size of at least ${min}`) => value => {
  return parseInt(value.length) >= parseInt(min) || message
}
