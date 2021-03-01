export const thousandsSeparator = (number: string, commas = ',') => {
  if (!number) return 0
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, commas)
}

export default {
  thousandsSeparator,
}
