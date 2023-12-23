import { parseISO } from 'date-fns'


export const prepareDate = (date) => {
  if (!date) return date
  if (date.toLocaleDateString) return date
  else return parseISO(date)
}
