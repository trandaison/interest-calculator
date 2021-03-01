<template>
  <div class="container mx-auto px-6">
    <div
      class="min-w-screen min-h-screen flex items-center justify-center font-sans overflow-hidden"
    >
      <div class="w-full lg:w-5/6">
        <div
          class="my-8 bg-white border-2 border-gray-300 p-6 rounded-xl tracking-wide shadow-lg"
        >
          <div class="text-center mb-4">
            <h3 class="text-2xl font-semibold text-gray-800">
              Tính Lãi Suất Vay
            </h3>
            <p class="m-0 text-gray-500">Dư nợ giảm dần</p>
          </div>
          <div class="mb-2">
            <label class="leading-loose"> Số tiền vay </label>
            <div class="flex">
              <input
                v-model="amount"
                type="number"
                class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
              <select
                v-model="amountMultiple"
                class="ml-4 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              >
                <option
                  v-for="option in amountMultipleOptions"
                  :key="option.value"
                  :value="option.value"
                  v-text="option.text"
                />
              </select>
            </div>
          </div>
          <div class="mb-2">
            <label class="leading-loose"> Thời gian vay </label>
            <div class="flex">
              <input
                v-model="loanDuration"
                type="number"
                class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
              <select
                v-model="durationMultiple"
                class="ml-4 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              >
                <option
                  v-for="option in durationMultipleOptions"
                  :key="option.value"
                  :value="option.value"
                  v-text="option.text"
                />
              </select>
            </div>
          </div>
          <div class="mb-2">
            <label class="leading-loose"> Lãi suất % năm </label>
            <input
              v-model="interestRate"
              type="number"
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            />
          </div>
          <div class="mb-2">
            <label class="leading-loose"> Ngày giải ngân </label>
            <input
              v-model="disbursementDate"
              type="date"
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            />
          </div>
          <div class="mb-2">
            <label class="leading-loose"> Lãi suất ưu đãi % năm (nếu có)</label>
            <input
              v-model="discountRate"
              type="number"
              class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            />
          </div>
          <div class="mb-2">
            <label class="leading-loose"> Thời gian ưu đãi </label>
            <div class="flex">
              <input
                v-model="loanDiscountDuration"
                type="number"
                class="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              />
              <select
                v-model="discountDurationMultiple"
                class="ml-4 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              >
                <option
                  v-for="option in durationMultipleOptions"
                  :key="option.value"
                  :value="option.value"
                  v-text="option.text"
                />
              </select>
            </div>
          </div>
          <div class="mt-6">
            <button
              class="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
              @click="scrollDown"
            >
              Xem Kết Quả
            </button>
          </div>
        </div>
      </div>
    </div>
    <ResultTable
      v-if="results.length"
      :months="results"
      :deposite-amount="depositeAmount"
      :disbursement-date="dateZero"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment'
import ResultTable from '@/components/ResultTable.vue'
import {
  amountMultipleOptions,
  durationMultipleOptions,
  DATE_FORMAT,
} from '@/configs'

@Component({
  components: {
    ResultTable,
  },
})
export default class Home extends Vue {
  private amount: number = NaN
  private amountMultiple: number = 1000000
  private readonly amountMultipleOptions = amountMultipleOptions()
  private loanDuration: number = NaN
  private durationMultiple: number = 1
  private durationMultipleOptions = durationMultipleOptions()
  private interestRate: number = NaN
  private disbursementDate: string = moment().format('YYYY-MM-DD')
  private discountRate: number = NaN
  private loanDiscountDuration: number = NaN
  private discountDurationMultiple: number = NaN

  get depositeAmount() {
    return this.amount * this.amountMultiple
  }

  get duration() {
    return this.loanDuration * this.durationMultiple
  }

  get discountDuration() {
    return this.loanDiscountDuration * this.discountDurationMultiple
  }

  get dateZero() {
    return moment(this.disbursementDate).format(DATE_FORMAT)
  }

  get results() {
    const discountDuration = this.discountDuration || 0
    const discountRate = Number(this.discountRate || this.interestRate)
    const months = []
    const monthlyAmount: number = Math.round(
      this.depositeAmount / this.duration
    )
    for (let index = 0; index < discountDuration; index++) {
      let remainningAmount = +this.depositeAmount - (index + 1) * +monthlyAmount
      if (remainningAmount < 0) remainningAmount = 0
      const monthlyInterest = Math.round(
        ((remainningAmount + monthlyAmount) * (discountRate / 100)) / 12
      )
      months.push({
        date: moment(this.disbursementDate)
          .add(index, 'months')
          .format(DATE_FORMAT),
        remainningAmount,
        monthlyAmount,
        monthlyInterest,
        monthlyTotal: monthlyInterest + monthlyAmount,
      })
    }

    for (let index = discountDuration; index < this.duration; index++) {
      let remainningAmount = +this.depositeAmount - (index + 1) * +monthlyAmount
      if (remainningAmount < 0) remainningAmount = 0
      const monthlyInterest = Math.round(
        ((remainningAmount + monthlyAmount) *
          (Number(this.interestRate) / 100)) /
          12
      )
      months.push({
        date: moment(this.disbursementDate)
          .add(index, 'months')
          .format(DATE_FORMAT),
        remainningAmount,
        monthlyAmount,
        monthlyInterest,
        monthlyTotal: monthlyInterest + monthlyAmount,
      })
    }
    return months
  }

  scrollDown() {
    window.scrollTo({
      top: (document.getElementById('results') || { offsetTop: 0 }).offsetTop,
      left: 0,
      behavior: 'smooth',
    })
  }
}
</script>
