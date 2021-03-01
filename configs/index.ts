import SelectOption from '@/interfaces/SelectOption'

export const amountMultipleOptions = (): SelectOption[] => [
  {
    text: 'Tỷ đồng',
    value: 1000000000,
  },
  {
    text: 'Triệu đồng',
    value: 1000000,
  },
  {
    text: 'Trăm nghìn đồng',
    value: 100000,
  },
  {
    text: 'nghìn đồng',
    value: 1000,
  },
  {
    text: 'VND',
    value: 1,
  },
]

export const durationMultipleOptions = (): SelectOption[] => [
  {
    text: 'Tháng',
    value: 1,
  },
  {
    text: 'Năm',
    value: 12,
  },
]
export const DATE_FORMAT = 'DD/MM/YYYY'

export default {
  amountMultipleOptions,
  durationMultipleOptions,
  DATE_FORMAT,
}
